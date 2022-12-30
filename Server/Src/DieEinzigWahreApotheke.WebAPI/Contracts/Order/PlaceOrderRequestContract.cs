using System.ComponentModel.DataAnnotations;

namespace DieEinzigWahreApotheke.WebAPI.Contracts.Order;

public class PlaceOrderRequestContract {
	[Required] public string ShippingAddressId { get; set; }
	[Required] public string BillingAddressId { get; set; }
}