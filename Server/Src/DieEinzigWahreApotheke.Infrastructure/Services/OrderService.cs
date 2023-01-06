using DerMagereStudent.EntityFrameworkCore.Extensions;

using DieEinzigWahreApotheke.Core.Entities;
using DieEinzigWahreApotheke.Core.Services;
using DieEinzigWahreApotheke.Core.ValueTypes;
using DieEinzigWahreApotheke.Infrastructure.Database;
using DieEinzigWahreApotheke.Infrastructure.Models;

using Mapster;

using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;

namespace DieEinzigWahreApotheke.Infrastructure.Services;

public class OrderService: IOrderService {
	private readonly ApplicationDbContext _applicationDbContext;
	private readonly IShoppingCartService _shoppingCartService;
	private readonly IMedicineService _medicineService;
	private readonly ISystemClock _systemClock;

	public OrderService(ApplicationDbContext applicationDbContext, IShoppingCartService shoppingCartService, IMedicineService medicineService, ISystemClock systemClock) {
		this._applicationDbContext = applicationDbContext;
		this._shoppingCartService = shoppingCartService;
		this._medicineService = medicineService;
		this._systemClock = systemClock;
	}
	
	public async Task<ApplicationResult<PageData<Order>>> GetOrdersAsync(string userId, int page, int itemsPerPage) {
		try {
			var orders = await this._applicationDbContext.Orders
				.Where(o => o.UserId == userId)
				.Skip(page * itemsPerPage)
				.Take(itemsPerPage)
				.Include(o => o.Items)
				.Include(o => o.ShippingAddress)
				.Include(o => o.BillingAddress)
				.ToArrayAsync();

			var totalCount = await this._applicationDbContext.Orders
				.Where(o => o.UserId == userId)
				.CountAsync();
			
			return ApplicationResult<PageData<Order>>.Success(new PageData<Order> {
				Page = page,
				ItemsPerPage = itemsPerPage,
				TotalItemCount = totalCount,
				Items = orders.Adapt<Order[]>()
			});
		}
		catch (Exception e) {
			return ApplicationResult<PageData<Order>>.Failed(new ApplicationError {Code = e.GetType().Name, Description = e.Message});
		}
	}

	public async Task<ApplicationResult<string>> PlaceOrderAsync(string userId, string shippingAddressId, string billingAddressId) {
		try {
			var cartResult = await this._shoppingCartService.GetCartAsync(userId);

			if (!cartResult.Succeeded)
				return ApplicationResult<string>.Failed(cartResult.Errors);

			var cartItems = cartResult.Data!.Where(i => i.Quantity > 0).ToList();

			if (cartItems.Count == 0) {
				return ApplicationResult<string>.Failed(new ApplicationError {
					Code = "EmptyCart",
					Description = "Your cart does not contain any items or only items with quantity 0."
				});
			}

			var medicineData = await this._medicineService.FindByPznsAsync(cartItems.Select(i => i.Pzn).ToList());

			var order = new OrderModel {
				UserId = userId,
				TimePlaced = this._systemClock.UtcNow.UtcDateTime,
				ShippingAddressId = shippingAddressId,
				BillingAddressId = billingAddressId
			};
			var orderItems = medicineData.Select(medicine => new OrderItem {
				OrderId = order.Id,
				Pzn = medicine.Pzn,
				Quantity = cartItems.Find(i => i.Pzn == medicine.Pzn)!.Quantity,
				Prize = medicine.Price ?? 0
			}).ToList();
			order.Total = orderItems.Select(i => i.Quantity * i.Prize).Sum();
			order.State = medicineData.Any(m => m.RequiresPrescription) ? OrderState.Placed : OrderState.Approved;

			this._applicationDbContext.Orders.Add(order);
			this._applicationDbContext.OrderItems.AddRange(orderItems);
			this._applicationDbContext.ShoppingCartItems.RemoveRange(cartItems);
			await this._applicationDbContext.SaveChangesAsync();
			
			return ApplicationResult<string>.Success(order.Id);
		}
		catch (Exception e) {
			return ApplicationResult<string>.Failed(new ApplicationError {Code = e.GetType().Name, Description = e.Message});
		}
	}

	public async Task<ApplicationResult> CancelOrderAsync(string userId, string orderId) {
		try {
			var order = await this._applicationDbContext.Orders.FindTrackedAsync(new OrderModel {Id = orderId});
			if (order is null)
				return ApplicationResult.Success();
			
			if (order.UserId != userId)
				return ApplicationResult.Failed(new ApplicationError {Code = "Unauthorized", Description = "The order does not belong to the specified user."});

			order.State = OrderState.Canceled;
			await this._applicationDbContext.SaveChangesAsync();
			
			return ApplicationResult.Success();
		}
		catch (Exception e) {
			return ApplicationResult.Failed(new ApplicationError {Code = e.GetType().Name, Description = e.Message});
		}
	}

	public async Task<ApplicationResult<PageData<Order>>> GetOrdersToApproveAsync(int page, int itemsPerPage) {
		try {
			var orders = await this._applicationDbContext.Orders
				.Where(o => o.State == OrderState.Placed)
				.Skip(page * itemsPerPage)
				.Take(itemsPerPage)
				.Include(o => o.Items)
				.ToArrayAsync();

			var totalCount = await this._applicationDbContext.Orders
				.Where(o => o.State == OrderState.Placed)
				.CountAsync();
			
			return ApplicationResult<PageData<Order>>.Success(new PageData<Order> {
				Page = page,
				ItemsPerPage = itemsPerPage,
				TotalItemCount = totalCount,
				Items = orders.Adapt<Order[]>()
			});
		}
		catch (Exception e) {
			return ApplicationResult<PageData<Order>>.Failed(new ApplicationError {Code = e.GetType().Name, Description = e.Message});
		}
	}

	public async Task<ApplicationResult> ApproveOrderAsync(string orderId) {
		try {
			var order = await this._applicationDbContext.Orders.FindTrackedAsync(new OrderModel {Id = orderId});
			if (order is null)
				return ApplicationResult.Failed(new ApplicationError {Code = "OrderNotFound", Description = "Order does not exist"});

			order.State = OrderState.Approved;
			await this._applicationDbContext.SaveChangesAsync();
			
			return ApplicationResult.Success();
		}
		catch (Exception e) {
			return ApplicationResult.Failed(new ApplicationError {Code = e.GetType().Name, Description = e.Message});
		}
	}
}