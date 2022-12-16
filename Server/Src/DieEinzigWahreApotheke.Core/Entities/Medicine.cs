namespace DieEinzigWahreApotheke.Core.Entities; 

public class Medicine {
	public string Pzn { get; set; }
	public string ProductName { get; set; }
	public string Manufacturer { get; set; }
	public string PharmaForm { get; set; }
	public bool RequiresPrescription { get; set; }
	
	public string Description { get; set; }
	public string ImageLink { get; set; }
	public string Ifap { get; set; }
	
	public string Status { get; set; }
	public bool InStock { get; set; }
	public int? Price { get; set; }
	public string? PriceFormatted { get; set; }
	public string? PackSize { get; set; }
	public string? PricePerUnit { get; set; }
}