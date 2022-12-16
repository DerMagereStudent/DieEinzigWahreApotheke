using System.ComponentModel.DataAnnotations;

namespace DieEinzigWahreApotheke.WebAPI.Contracts; 

public class FindMedicineByPznsRequestContract {
	[Required]
	public List<string> Pzns { get; set; }
}