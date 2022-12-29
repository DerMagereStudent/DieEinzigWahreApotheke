using System.ComponentModel.DataAnnotations;

namespace DieEinzigWahreApotheke.WebAPI.Contracts.User; 

public class LoginRequestContract {
	[Required, EmailAddress]
	public string Email { get; set; }
	[Required] public string Password { get; set; }
}