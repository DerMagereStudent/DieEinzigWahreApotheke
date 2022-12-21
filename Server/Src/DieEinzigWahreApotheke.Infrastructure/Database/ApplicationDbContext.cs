using DieEinzigWahreApotheke.Infrastructure.Models;

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DieEinzigWahreApotheke.Infrastructure.Database; 

public class ApplicationDbContext : IdentityDbContext<ApplicationUser> {
	public DbSet<UserAddress> UserAddresses { get; set; } = default!;

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
	}
}