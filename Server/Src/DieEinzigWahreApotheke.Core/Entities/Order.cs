﻿namespace DieEinzigWahreApotheke.Core.Entities; 

public class Order {
	public string Id { get; set; }
	public DateTime TimePlaced { get; set; }
	public List<OrderItem> Items { get; set; }
	public Address ShippingAddress { get; set; }
	public Address BillingAddress { get; set; }
	public int Total { get; set; }
	public OrderState State { get; set; }

	public Order() {
		this.Id = Guid.NewGuid().ToString();
	}
}