using DieEinzigWahreApotheke.Core.Entities;
using DieEinzigWahreApotheke.Core.ValueTypes;

namespace DieEinzigWahreApotheke.Core.Services; 

public interface IOrderService {
	public Task<ApplicationResult<PageData<Order>>> GetOrdersAsync(string userId, int page, int itemsPerPage);
	public Task<ApplicationResult<string>> PlaceOrderAsync(string userId, string shippingAddressId, string billingAddressId);
	public Task<ApplicationResult> CancelOrderAsync(string userId, string orderId);
	public Task<ApplicationResult<PageData<Order>>> GetOrdersToApproveAsync(int page, int itemsPerPage);
	public Task<ApplicationResult> ApproveOrderAsync(string orderId);
}