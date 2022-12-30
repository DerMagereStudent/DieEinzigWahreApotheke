﻿using DieEinzigWahreApotheke.Core.Services;
using DieEinzigWahreApotheke.Infrastructure.Models;
using DieEinzigWahreApotheke.WebAPI.Contracts.Order;

using Docker.DotNet.Models;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DieEinzigWahreApotheke.WebAPI.Controller; 

[ApiController]
[Route("/api/order")]
public class OrderController : ControllerBase {
	private readonly IOrderService _orderService;
	private readonly UserManager<ApplicationUser> _userManager;

	public OrderController(IOrderService orderService, UserManager<ApplicationUser> userManager) {
		this._orderService = orderService;
		this._userManager = userManager;
	}

	[HttpGet]
	[Authorize]
	public async Task<IActionResult> GetOrdersAsync([FromQuery] GetOrdersRequestContract requestData) {
		return this.Ok(await this._orderService.GetOrdersAsync(this._userManager.GetUserId(this.User)!, requestData.Page, requestData.ItemsPerPage));
	}

	[HttpPost]
	[Authorize]
	public async Task<IActionResult> PlaceOrderAsync([FromBody] PlaceOrderRequestContract requestData) {
		return this.Ok(await this._orderService.PlaceOrderAsync(this._userManager.GetUserId(this.User)!, requestData.ShippingAddressId, requestData.BillingAddressId));
	}

	[HttpDelete]
	[Authorize]
	public async Task<IActionResult> CancelOrderAsync([FromBody] CancelOrderRequestContract requestData) {
		return this.Ok(await this._orderService.CancelOrderAsync(this._userManager.GetUserId(this.User)!, requestData.OrderId));
	}
}