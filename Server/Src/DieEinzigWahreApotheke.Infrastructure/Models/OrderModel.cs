using DieEinzigWahreApotheke.Core.Entities;

namespace DieEinzigWahreApotheke.Infrastructure.Models; 

public class OrderModel : Order {
	public string UserId { get; set; }
	public string ShippingAddressId { get; set; }
	public string BillingAddressId { get; set; }
}