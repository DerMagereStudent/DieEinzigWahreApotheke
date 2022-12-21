using Microsoft.AspNetCore.Identity;

namespace DieEinzigWahreApotheke.Infrastructure.Models; 

public class ApplicationUser : IdentityUser {
	public string Title { get; set; }
	public string FirstName { get; set; }
	public string LastName { get; set; }
	public DateOnly Birthday { get; set; }
}