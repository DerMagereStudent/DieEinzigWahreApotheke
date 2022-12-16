using DieEinzigWahreApotheke.Core.Services;
using DieEinzigWahreApotheke.WebAPI.Contracts;

using Microsoft.AspNetCore.Mvc;

namespace DieEinzigWahreApotheke.WebAPI.Controller; 

[ApiController]
[Route("api/medicine")]
public class MedicineController : ControllerBase {
	private readonly IMedicineService _medicineService;

	public MedicineController(IMedicineService medicineService) {
		this._medicineService = medicineService;
	}

	[HttpPost]
	[Route("search")]
	public async Task<IActionResult> FindBySearchStringAsync([FromBody] FindMedicineBySearchStringRequestContract requestBody) {
		return this.Ok(await this._medicineService.FindBySearchStringAsync(requestBody.SearchString, requestBody.MaxResults));
	}
	
	[HttpPost]
	[Route("search/pzn")]
	public async Task<IActionResult> FindByPznAsync([FromBody] FindMedicineByPznRequestContract requestBody) {
		return this.Ok(await this._medicineService.FindByPznAsync(requestBody.Pzn));
	}
	
	[HttpPost]
	[Route("search/pzns")]
	public async Task<IActionResult> FindByPznsAsync([FromBody] FindMedicineByPznsRequestContract requestBody) {
		return this.Ok(await this._medicineService.FindByPznsAsync(requestBody.Pzns));
	}
}