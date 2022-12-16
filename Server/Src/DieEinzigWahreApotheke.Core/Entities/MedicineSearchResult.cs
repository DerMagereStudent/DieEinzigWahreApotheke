namespace DieEinzigWahreApotheke.Core.Entities; 

public class MedicineSearchResult {
	public int Pages { get; set; }
	public int Hits { get; set; }
	public int Page { get; set; }
	public List<Medicine> PageContent { get; set; }
}