﻿using DieEinzigWahreApotheke.Core.Entities;
using DieEinzigWahreApotheke.Core.Services;
using DieEinzigWahreApotheke.Infrastructure.Database;
using DieEinzigWahreApotheke.Infrastructure.Models;

using Mapster;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace DieEinzigWahreApotheke.Infrastructure.Services; 

public class UserService : IUserService {
	private readonly IHttpContextAccessor _httpContextAccessor;
	private readonly UserManager<ApplicationUser> _userManager;
	private readonly SignInManager<ApplicationUser> _signInManager;
	private readonly IdentityErrorDescriber _errorDescriber;
	private readonly ApplicationDbContext _applicationDbContext;

	public UserService(
		IHttpContextAccessor httpContextAccessor,
		UserManager<ApplicationUser> userManager,
		SignInManager<ApplicationUser> signInManager,
		IdentityErrorDescriber errorDescriber,
		ApplicationDbContext applicationDbContext) {
		this._httpContextAccessor = httpContextAccessor;
		this._userManager = userManager;
		this._signInManager = signInManager;
		this._errorDescriber = errorDescriber;
		this._applicationDbContext = applicationDbContext;
	}
	
	public async Task<IdentityResult> SignUpAsync(string email, string password, string title, string firstName, string lastName, DateOnly birthday, Address address) {
		var user = new ApplicationUser {
			UserName = email,
			Email = email,
			Title = title,
			FirstName = firstName,
			LastName = lastName,
			Birthday = birthday
		};

		var creationResult = await this._userManager.CreateAsync(user, password);

		if (!creationResult.Succeeded)
			return creationResult;

		var userAddress = address.Adapt<UserAddress>();
		userAddress.Id = Guid.NewGuid().ToString();
		userAddress.UserId = user.Id;

		this._applicationDbContext.UserAddresses.Add(userAddress);
		await this._applicationDbContext.SaveChangesAsync();
		return IdentityResult.Success;
	}

	public async Task<IdentityResult> LoginAsync(string email, string password) {
		var user = await this._userManager.FindByEmailAsync(email);

		if (user is null)
			return IdentityResult.Failed(this._errorDescriber.InvalidEmail(email));

		var checkPasswordResult = await this._userManager.CheckPasswordAsync(user, password);

		if (!checkPasswordResult)
			return IdentityResult.Failed();

		await this._signInManager.SignInAsync(user, false);
		return IdentityResult.Success;
	}

	public async Task LogoutAsync() {
		await this._signInManager.SignOutAsync();
	}

	public bool CheckIfAuthenticated() {
		return this._signInManager.IsSignedIn(this._httpContextAccessor.HttpContext.User);
	}
}