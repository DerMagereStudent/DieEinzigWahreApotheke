﻿using System.ComponentModel.DataAnnotations;

namespace DieEinzigWahreApotheke.WebAPI.Contracts.Cart; 

public class UpdateCartItemQuantityRequestContract {
	[Required] public string Pzn { get; set; }
	[Required] public int Quantity { get; set; }
}