namespace DieEinzigWahreApotheke.Core.Entities; 

public class Address {
	public string Id { get; set; }
	public string Street { get; set; }
	public string HouseNr { get; set; }
	public string State { get; set; }
	public string Country { get; set; }

	public Address() {
		this.Id = Guid.NewGuid().ToString();
	}
}