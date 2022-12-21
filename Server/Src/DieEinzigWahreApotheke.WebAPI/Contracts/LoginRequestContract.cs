using System.ComponentModel.DataAnnotations;

using DieEinzigWahreApotheke.Core.Entities;

namespace DieEinzigWahreApotheke.WebAPI.Contracts; 

public class LoginRequestContract {
	[Required, EmailAddress]
	public string Email { get; set; }
	[Required] public string Password { get; set; }
}