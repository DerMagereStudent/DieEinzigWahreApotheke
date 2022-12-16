using System.Text.RegularExpressions;

using DieEinzigWahreApotheke.Core.Entities;
using DieEinzigWahreApotheke.Core.Services;
using DieEinzigWahreApotheke.Infrastructure.Models.Algolia;

using Newtonsoft.Json;

namespace DieEinzigWahreApotheke.Infrastructure.Services; 

public class MedicineService : IMedicineService {
	private Regex _pznValidationRegex;
	private const string AlgoliaUrl = "https://58ecuely50-dsn.algolia.net/1/indexes/products_mktplc_prod_DE_de/query?x-algolia-agent=Algolia for JavaScript (4.11.0); Browser (lite)&x-algolia-api-key=6706777b1652b0b3d519958312d1ffa1&x-algolia-application-id=58ECUELY50";
	
	public MedicineService() {
		this._pznValidationRegex = new Regex("^[0-9]{8,8}$", RegexOptions.Compiled);
	}
	
	public async Task<IList<Medicine>> FindBySearchStringAsync(string searchString, int maxResults) {
		var query = new MedicineSearchQuery {Query = searchString, HitsPerPage = maxResults};
		
		using var httpClient = new HttpClient();
		var response = await httpClient.PostAsync(MedicineService.AlgoliaUrl, new StringContent(JsonConvert.SerializeObject(query)));
		var responseString = await response.Content.ReadAsStringAsync();
		var result = JsonConvert.DeserializeObject<MedicineSearchQueryResult>(responseString);

		if (result is null || result.Hits is null ||result.Hits.Count == 0)
			return null;

		return result.Hits.Select(this.MapQueryResultHitToMedicine).ToList();
	}

	public async Task<Medicine?> FindByPznAsync(string pzn) {
		if (!this._pznValidationRegex.IsMatch(pzn))
			throw new ArgumentException($"The PZN {pzn} is not a valid value");

		var query = new MedicineSearchQuery {Query = pzn, HitsPerPage = 1};
		
		using var httpClient = new HttpClient();
		var response = await httpClient.PostAsync(MedicineService.AlgoliaUrl, new StringContent(JsonConvert.SerializeObject(query)));
		var responseString = await response.Content.ReadAsStringAsync();
		var result = JsonConvert.DeserializeObject<MedicineSearchQueryResult>(responseString);

		if (result is null || result.Hits.Count == 0)
			return null;

		return this.MapQueryResultHitToMedicine(result.Hits[0]);
	}

	public async Task<IList<Medicine>> FindByPznsAsync(List<string> pzns) {
		foreach (var pzn in pzns)
			if (!this._pznValidationRegex.IsMatch(pzn))
				throw new ArgumentException($"The PZN {pzn} is not a valid value");
		
		var query = new MedicineSearchQuery {Query = string.Join(' ', pzns), HitsPerPage = pzns.Count};
		
		using var httpClient = new HttpClient();
		var response = await httpClient.PostAsync(MedicineService.AlgoliaUrl, new StringContent(JsonConvert.SerializeObject(query)));
		var responseString = await response.Content.ReadAsStringAsync();
		var result = JsonConvert.DeserializeObject<MedicineSearchQueryResult>(responseString);

		if (result is null || result.Hits.Count == 0)
			return new List<Medicine>();

		return result.Hits.Select(this.MapQueryResultHitToMedicine).ToList();
	}

	private Medicine MapQueryResultHitToMedicine(MedicineSearchQueryResultHit queryResultHit) {
		return new Medicine {
			Pzn = queryResultHit.Pzn,
			ProductName = queryResultHit.ProductName,
			Manufacturer = queryResultHit.Manufacturer,
			PharmaForm = queryResultHit.PharmaForm,
			RequiresPrescription = queryResultHit.PrescriptionMedicine,
			Description = queryResultHit.DescriptionShort,
			ImageLink = queryResultHit.Image,
			Ifap = queryResultHit.Ifap,
			Status = queryResultHit.Status,
			InStock = queryResultHit.InStock,
			Price = queryResultHit.Price,
			PriceFormatted = queryResultHit.PriceFormatted,
			PackSize = queryResultHit.PackSize,
			PricePerUnit = queryResultHit.PricePerUnit
		};
	}
}