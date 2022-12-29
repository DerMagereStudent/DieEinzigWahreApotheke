using DieEinzigWahreApotheke.Core.Services;
using DieEinzigWahreApotheke.WebAPI.Contracts;
using DieEinzigWahreApotheke.WebAPI.Contracts.User;

using Microsoft.AspNetCore.Mvc;

namespace DieEinzigWahreApotheke.WebAPI.Controller; 

[ApiController]
[Route("api/user")]
public class UserController : ControllerBase {
	private readonly IUserService _userService;

	public UserController(IUserService userService) {
		this._userService = userService;
	}
	
	[HttpPost]
	[Route("signup")]
	public async Task<IActionResult> SignUpAsync([FromBody] SignUpRequestContract requestBody) {
		return this.Ok(await this._userService.SignUpAsync(
			requestBody.Email, requestBody.Password, 
			requestBody.Title, requestBody.FirstName, requestBody.LastName, DateOnly.FromDateTime(requestBody.Birthday),
			requestBody.Address
		));
	}
	
	[HttpPost]
	[Route("login")]
	public async Task<IActionResult> LoginAsync([FromBody] LoginRequestContract requestBody) {
		return this.Ok(await this._userService.LoginAsync(requestBody.Email, requestBody.Password));
	}
	
	[HttpPost]
	[Route("logout")]
	public async Task<IActionResult> LogoutAsync() {
		await this._userService.LogoutAsync();
		return this.Ok();
	}
	
	[HttpPost]
	[Route("auth")]
	public IActionResult CheckIfAuthenticated() {
		return this.Ok(this._userService.CheckIfAuthenticated());
	}
}