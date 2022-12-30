using DieEinzigWahreApotheke.Core.Entities;
using DieEinzigWahreApotheke.Core.ValueTypes;

using Microsoft.AspNetCore.Identity;

namespace DieEinzigWahreApotheke.Core.Services; 

public interface IUserService {
	Task<IdentityResult> SignUpAsync(string email, string password, string title, string firstName, string lastName, DateOnly birthday, Address address);
	Task<IdentityResult> LoginAsync(string email, string password);
	Task LogoutAsync();
	bool CheckIfAuthenticated();
	Task<ApplicationResult<Address[]>> GetAddressesAsync(string userId);
	Task<ApplicationResult<Address>> AddAddressAsync(string userId, Address address);
	Task<ApplicationResult> RemoveAddressAsync(string addressId);
}