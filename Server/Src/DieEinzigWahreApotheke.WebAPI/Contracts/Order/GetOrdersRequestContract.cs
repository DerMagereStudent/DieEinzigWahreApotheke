using System.ComponentModel.DataAnnotations;

namespace DieEinzigWahreApotheke.WebAPI.Contracts.Order; 

public class GetOrdersRequestContract {
	[Required, Range(0, int.MaxValue)] public int Page { get; set; }
	[Required, Range(1, int.MaxValue)] public int ItemsPerPage { get; set; }
}