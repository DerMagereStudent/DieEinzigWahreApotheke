namespace DieEinzigWahreApotheke.Infrastructure.Models.Algolia; 

public class MedicineSearchQueryResultHit {
	public string Pzn { get; set; }
	public string ProductName { get; set; }
	public string Manufacturer { get; set; }
	public string PharmaForm { get; set; }
	public bool PrescriptionMedicine { get; set; }
	
	public string DescriptionShort { get; set; }
	public string Image { get; set; }
	public string Ifap { get; set; }
	
	public string Status { get; set; }
	public bool InStock { get; set; }
	public int? Price { get; set; }
	public string? PriceFormatted { get; set; }
	public string? PackSize { get; set; }
	public string? PricePerUnit { get; set; }
}