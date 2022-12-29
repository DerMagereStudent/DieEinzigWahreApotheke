using System.ComponentModel.DataAnnotations;

namespace DieEinzigWahreApotheke.WebAPI.Contracts.Medicine; 

public class FindMedicineByPznRequestContract {
	[Required, RegularExpression("^[0-9]{8,8}$")]
	public string Pzn { get; set; }
}