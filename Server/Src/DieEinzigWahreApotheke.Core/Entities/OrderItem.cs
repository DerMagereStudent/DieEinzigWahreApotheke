namespace DieEinzigWahreApotheke.Core.Entities; 

public class OrderItem {
	public string OrderId { get; set; }
	public string Pzn { get; set; }
	public int Quantity { get; set; }
}