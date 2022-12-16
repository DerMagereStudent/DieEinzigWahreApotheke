using System.ComponentModel.DataAnnotations;

namespace DieEinzigWahreApotheke.WebAPI.Contracts; 

public class FindMedicineBySearchStringRequestContract {
	[Required] public string SearchString { get; set; }
	public int MaxResults { get; set; } = 5;
}