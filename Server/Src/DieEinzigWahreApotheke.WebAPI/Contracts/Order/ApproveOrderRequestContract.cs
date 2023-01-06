using System.ComponentModel.DataAnnotations;

namespace DieEinzigWahreApotheke.WebAPI.Contracts.Order;

public class ApproveOrderRequestContract {
	[Required] public string OrderId { get; set; }
}