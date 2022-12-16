using System.ComponentModel.DataAnnotations;

namespace DieEinzigWahreApotheke.WebAPI.Contracts; 

public class FindMedicineByPznRequestContract {
	[Required, RegularExpression("^[0-9]{8,8}$")]
	public string Pzn { get; set; }
}