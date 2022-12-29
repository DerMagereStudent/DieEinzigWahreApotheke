using DieEinzigWahreApotheke.Core.Services;
using DieEinzigWahreApotheke.Infrastructure.Models;
using DieEinzigWahreApotheke.WebAPI.Contracts.Cart;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DieEinzigWahreApotheke.WebAPI.Controller; 

[ApiController]
[Route("api/cart")]
public class ShoppingCartController : ControllerBase {
	private readonly IShoppingCartService _shoppingCartService;
	private readonly UserManager<ApplicationUser> _userManager;

	public ShoppingCartController(IShoppingCartService shoppingCartService, UserManager<ApplicationUser> userManager) {
		this._shoppingCartService = shoppingCartService;
		this._userManager = userManager;
	}

	[HttpGet]
	public async Task<IActionResult> GetCartAsync() {
		return this.Ok(await this._shoppingCartService.GetCartAsync(this._userManager.GetUserId(this.User)!));
	}
	
	[HttpPost]
	public async Task<IActionResult> AddToCartAsync([FromBody] AddCartItemRequestContract requestBody) {
		return this.Ok(await this._shoppingCartService.AddToCartAsync(this._userManager.GetUserId(this.User)!, requestBody.Pzn, requestBody.Quantity));
	}

	[HttpDelete]
	public async Task<IActionResult> RemoveFromCartAsync([FromBody] RemoveCartItemRequestContract requestBody) {
		return this.Ok(await this._shoppingCartService.RemoveFromCartAsync(this._userManager.GetUserId(this.User)!, requestBody.Pzn));
	}

	[HttpPut]
	public async Task<IActionResult> UpdateQuantityAsync([FromBody] UpdateCartItemQuantityRequestContract requestBody) {
		return this.Ok(await this._shoppingCartService.UpdateQuantityAsync(this._userManager.GetUserId(this.User)!, requestBody.Pzn, requestBody.Quantity));
	}
}