namespace DieEinzigWahreApotheke.Core.Entities; 

public class ShoppingCartItem {
	public string UserId { get; set; }
	public string Pzn { get; set; }
	public int Quantity { get; set; }
}