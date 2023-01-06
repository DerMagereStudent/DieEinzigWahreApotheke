namespace DieEinzigWahreApotheke.Core.Entities; 

public class UserInfo {
	public string Email { get; set; }
	public string Title { get; set; }
	public string FirstName { get; set; }
	public string LastName { get; set; }
	public string[] Roles { get; set; }
	public Address[] Addresses { get; set; }
}