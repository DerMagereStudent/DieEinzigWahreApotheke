using System.ComponentModel.DataAnnotations;

namespace DieEinzigWahreApotheke.WebAPI.Contracts.Order;

public class CancelOrderRequestContract {
	[Required] public string OrderId { get; set; }
}