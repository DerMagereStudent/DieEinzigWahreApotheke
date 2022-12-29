using DerMagereStudent.EntityFrameworkCore.Extensions;

using DieEinzigWahreApotheke.Core.Entities;
using DieEinzigWahreApotheke.Core.Services;
using DieEinzigWahreApotheke.Core.ValueTypes;
using DieEinzigWahreApotheke.Infrastructure.Database;

using Microsoft.EntityFrameworkCore;

namespace DieEinzigWahreApotheke.Infrastructure.Services; 

public class ShoppingCartService : IShoppingCartService {
	private readonly ApplicationDbContext _dbContext;

	public ShoppingCartService(ApplicationDbContext dbContext) {
		this._dbContext = dbContext;
	}

	public async Task<ApplicationResult<ShoppingCartItem[]>> GetCartAsync(string userId) {
		try {
			return ApplicationResult<ShoppingCartItem[]>.Success(
				await this._dbContext.ShoppingCartItems.Where(i => i.UserId == userId).ToArrayAsync()
			);
		}
		catch (Exception e) {
			return ApplicationResult<ShoppingCartItem[]>.Failed(new ApplicationError {Code = e.GetType().Name, Description = e.Message});
		}
	}

	public async Task<ApplicationResult> AddToCartAsync(string userId, string pzn, int quantity) {
		var cartItem = new ShoppingCartItem {
			UserId = userId,
			Pzn = pzn,
			Quantity = quantity
		};

		try {
			var existingCartItem = await this._dbContext.ShoppingCartItems.FindTrackedAsync(cartItem);

			if (existingCartItem is not null) {
				existingCartItem.Quantity += quantity;
				await this._dbContext.SaveChangesAsync();
			} else {
				this._dbContext.ShoppingCartItems.Add(cartItem);
				await this._dbContext.SaveChangesAsync();
			}

			return ApplicationResult.Success();
		}
		catch (Exception e) {
			return ApplicationResult.Failed(new ApplicationError {Code = e.GetType().Name, Description = e.Message});
		}
	}

	public async Task<ApplicationResult> RemoveFromCartAsync(string userId, string pzn) {
		var cartItem = new ShoppingCartItem {
			UserId = userId,
			Pzn = pzn
		};

		try {
			var existingCartItem = await this._dbContext.ShoppingCartItems.FindTrackedAsync(cartItem);

			if (existingCartItem is not null) {
				this._dbContext.ShoppingCartItems.Remove(cartItem);
				await this._dbContext.SaveChangesAsync();
			}

			return ApplicationResult.Success();
		}
		catch (Exception e) {
			return ApplicationResult.Failed(new ApplicationError {Code = e.GetType().Name, Description = e.Message});
		}
	}

	public async Task<ApplicationResult> UpdateQuantityAsync(string userId, string pzn, int quantity) {
		var cartItem = new ShoppingCartItem {
			UserId = userId,
			Pzn = pzn,
			Quantity = quantity
		};

		try {
			var existingCartItem = await this._dbContext.ShoppingCartItems.FindTrackedAsync(cartItem);

			if (existingCartItem is null)
				return ApplicationResult.Failed(new ApplicationError {Code = "ItemNotFound", Description = "Your shopping cart does not contain the specified item."});
				
			existingCartItem.Quantity = quantity;
			await this._dbContext.SaveChangesAsync();

			return ApplicationResult.Success();
		}
		catch (Exception e) {
			return ApplicationResult.Failed(new ApplicationError {Code = e.GetType().Name, Description = e.Message});
		}
	}
}