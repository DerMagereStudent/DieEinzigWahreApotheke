namespace DieEinzigWahreApotheke.Core.ValueTypes; 

public class PageData<TData> {
	public int Page { get; set; }
	public int ItemsPerPage { get; set; }
	public int TotalItemCount { get; set; }
	public TData[] Items { get; set; }
}