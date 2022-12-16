namespace DieEinzigWahreApotheke.Infrastructure.Models.Algolia; 

public class MedicineSearchQueryResult {
	public List<MedicineSearchQueryResultHit> Hits { get; set; }
	public int Page { get; set; }
	public int NbPages { get; set; }
	public int NbHits { get; set; }
}