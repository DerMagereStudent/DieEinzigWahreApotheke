using DieEinzigWahreApotheke.Core.Entities;

namespace DieEinzigWahreApotheke.Core.Services; 

public interface IMedicineService {
	Task<MedicineSearchResult> FindBySearchStringAsync(string searchString, int page, int itemsPerPage);
	Task<Medicine?> FindByPznAsync(string pzn);
	Task<IList<Medicine>> FindByPznsAsync(List<string> pzns);
}