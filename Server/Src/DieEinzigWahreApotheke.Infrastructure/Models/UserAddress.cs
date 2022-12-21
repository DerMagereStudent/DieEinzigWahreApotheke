using DieEinzigWahreApotheke.Core.Entities;

namespace DieEinzigWahreApotheke.Infrastructure.Models; 

public class UserAddress : Address {
	public string UserId { get; set; }
}