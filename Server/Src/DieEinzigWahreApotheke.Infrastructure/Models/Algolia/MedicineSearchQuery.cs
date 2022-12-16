using Newtonsoft.Json;

namespace DieEinzigWahreApotheke.Infrastructure.Models.Algolia; 

public class MedicineSearchQuery {
	[JsonProperty("query")]
	public string Query { get; set; }
	
	[JsonProperty("analytics")]
	public bool Analytics { get; set; } = false;
	
	[JsonProperty("analyticsTags")]
	public List<string> AnalyticsTags { get; set; } = new() {
		"suggestions",
		"desktop"
	};
	
	[JsonProperty("clickAnalytics")]
	public bool ClickAnalytics { get; set; } = false;
	
	[JsonProperty("filters")]
	public string Filters { get; set; } = "stockStatusReason:product.stockStatus.available OR stockStatusReason:product.stockStatus.nl OR stockStatusReason:product.stockStatus.notInCatalog OR stockStatusReason:product.stockStatus.av OR stockStatusReason:product.stockStatus.gratis";
	
	[JsonProperty("page")]
	public int Page { get; set; } = 0;
	
	[JsonProperty("hitsPerPage")]
	public int HitsPerPage { get; set; } = 5;
	
	[JsonProperty("getRankingInfo")]
	public bool GetRankingInfo { get; set; } = true;
	
	[JsonProperty("ruleContexts")]
	public List<string> RuleContexts { get; set; } = new() {
		"ggl"
	};
}