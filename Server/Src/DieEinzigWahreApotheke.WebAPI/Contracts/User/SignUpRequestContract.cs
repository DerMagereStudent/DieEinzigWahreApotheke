using System.ComponentModel.DataAnnotations;

using DieEinzigWahreApotheke.Core.Entities;

namespace DieEinzigWahreApotheke.WebAPI.Contracts.User; 

public class SignUpRequestContract {
	[Required, EmailAddress]
	public string Email { get; set; }
	[Required] public string Password { get; set; }
	
	[Required] public string Title { get; set; }
	[Required] public string FirstName { get; set; }
	[Required] public string LastName { get; set; }
	[Required] public DateTime Birthday { get; set; }
	[Required] public Address Address { get; set; }
}