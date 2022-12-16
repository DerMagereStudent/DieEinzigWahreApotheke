using System.ComponentModel.DataAnnotations;

namespace DieEinzigWahreApotheke.WebAPI.Contracts; 

public class FindMedicineBySearchStringRequestContract {
	[Required] public string SearchString { get; set; }
	[Range(0, int.MaxValue)] public int Page { get; set; } = 0;
	[Range(1, int.MaxValue)] public int ItemsPerPage { get; set; } = 5;
}