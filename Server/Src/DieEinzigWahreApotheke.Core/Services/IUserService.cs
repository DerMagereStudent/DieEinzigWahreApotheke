using DieEinzigWahreApotheke.Core.Entities;

using Microsoft.AspNetCore.Identity;

namespace DieEinzigWahreApotheke.Core.Services; 

public interface IUserService {
	Task<IdentityResult> SignUpAsync(string email, string password, string title, string firstName, string lastName, DateOnly birthday, Address address);
	Task<IdentityResult> LoginAsync(string email, string password);
	Task LogoutAsync();
	bool CheckIfAuthenticated();
}