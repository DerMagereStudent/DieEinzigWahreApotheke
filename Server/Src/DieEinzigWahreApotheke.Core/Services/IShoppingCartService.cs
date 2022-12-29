using DieEinzigWahreApotheke.Core.Entities;
using DieEinzigWahreApotheke.Core.ValueTypes;

namespace DieEinzigWahreApotheke.Core.Services; 

public interface IShoppingCartService {
	Task<ApplicationResult<ShoppingCartItem[]>> GetCartAsync(string userId);
	Task<ApplicationResult> AddToCartAsync(string userId, string pzn, int quantity);
	Task<ApplicationResult> RemoveFromCartAsync(string userId, string pzn);
	Task<ApplicationResult> UpdateQuantityAsync(string userId, string pzn, int quantity);
}