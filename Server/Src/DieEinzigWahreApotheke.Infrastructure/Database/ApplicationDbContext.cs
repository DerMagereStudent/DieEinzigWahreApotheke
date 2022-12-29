using DieEinzigWahreApotheke.Core.Entities;
using DieEinzigWahreApotheke.Infrastructure.Models;

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DieEinzigWahreApotheke.Infrastructure.Database; 

public class ApplicationDbContext : IdentityDbContext<ApplicationUser> {
	public DbSet<UserAddress> UserAddresses { get; set; } = default!;
	public DbSet<ShoppingCartItem> ShoppingCartItems { get; set; } = default!;

	public ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbContextOptions): base(dbContextOptions) { }

	protected override void OnModelCreating(ModelBuilder builder) {
		base.OnModelCreating(builder);

		builder.Entity<UserAddress>(address => {
			address.HasKey(a => a.Id);
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
	}
}