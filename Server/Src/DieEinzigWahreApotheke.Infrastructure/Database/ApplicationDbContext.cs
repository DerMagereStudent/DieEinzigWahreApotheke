using DieEinzigWahreApotheke.Core.Entities;
using DieEinzigWahreApotheke.Infrastructure.Models;

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DieEinzigWahreApotheke.Infrastructure.Database; 

public class ApplicationDbContext : IdentityDbContext<ApplicationUser> {
	public DbSet<UserAddress> UserAddresses { get; set; } = default!;
	public DbSet<ShoppingCartItem> ShoppingCartItems { get; set; } = default!;
	public DbSet<OrderModel> Orders { get; set; } = default!;
	public DbSet<OrderItem> OrderItems { get; set; } = default!;

	public ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbContextOptions): base(dbContextOptions) { }

	protected override void OnModelCreating(ModelBuilder builder) {
		base.OnModelCreating(builder);

		builder.Entity<Address>(address => {
			address.HasKey(a => a.Id);
		});
		
		builder.Entity<UserAddress>(address => {
			address.HasOne<ApplicationUser>()
				.WithMany()
				.HasForeignKey(a => a.UserId)
				.IsRequired();
		});
		
		builder.Entity<ShoppingCartItem>(shoppingCartItem => {
			shoppingCartItem.HasKey(i => new {i.UserId, i.Pzn});
			shoppingCartItem.HasOne<ApplicationUser>()
				.WithMany()
				.HasForeignKey(i => i.UserId)
				.IsRequired();
		});

		builder.Entity<OrderModel>(order => {
			order.HasKey(o => o.Id);
			order.HasMany<OrderItem>(o => o.Items).WithOne().HasForeignKey(item => item.OrderId);
			order.HasOne<Address>(o => o.ShippingAddress).WithMany().HasForeignKey(o => o.ShippingAddressId);
			order.HasOne<Address>(o => o.BillingAddress).WithMany().HasForeignKey(o => o.BillingAddressId);
			order.HasOne<ApplicationUser>().WithMany().HasForeignKey(o => o.UserId);
		});

		builder.Entity<OrderItem>(orderItem => {
			orderItem.HasKey(i => new {i.OrderId, i.Pzn});
		});
	}
}