using System.ComponentModel.DataAnnotations;

namespace DieEinzigWahreApotheke.WebAPI.Contracts.Medicine; 

public class FindMedicineByPznsRequestContract {
	[Required]
	public List<string> Pzns { get; set; }
}