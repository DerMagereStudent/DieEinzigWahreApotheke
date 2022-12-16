using DieEinzigWahreApotheke.Core.Entities;

namespace DieEinzigWahreApotheke.Core.Services; 

public interface IMedicineService {
	Task<IList<Medicine>> FindBySearchStringAsync(string searchString, int maxR);
	Task<Medicine?> FindByPznAsync(string pzn);
	Task<IList<Medicine>> FindByPznsAsync(List<string> pzns);
}