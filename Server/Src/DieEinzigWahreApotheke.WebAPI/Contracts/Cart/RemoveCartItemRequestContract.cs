using System.ComponentModel.DataAnnotations;

namespace DieEinzigWahreApotheke.WebAPI.Contracts.Cart; 

public class RemoveCartItemRequestContract {
	[Required] public string Pzn { get; set; }
}