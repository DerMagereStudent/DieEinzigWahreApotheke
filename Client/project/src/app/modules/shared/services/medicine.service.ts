import { Injectable } from '@angular/core';
import { MedicineSearchResult } from '../models/MedicineSearchResult';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { FindMedicineBySearchStringRequestContract } from '../contracts/medicine/FindMedicineBySearchStringRequestContract';
import { Medicine } from '../models/Medicine';
import { FindMedicineByPznRequestContract } from '../contracts/medicine/FindMedicineByPznRequestContract';
import { FindMedicineByPznsRequestContract } from '../contracts/medicine/FindMedicineByPznsRequestContract';

@Injectable({
    providedIn: 'root',
})
export class MedicineService {

constructor(private httpService: HttpService) { }
    public async findBySearchString(body: FindMedicineBySearchStringRequestContract) : Promise<MedicineSearchResult> {
        return await this.httpService.post(environment.apiRoutes.medicine.findBySearchString, body);
    }
    
    public async findByPzn(body: FindMedicineByPznRequestContract) : Promise<Medicine | undefined> {
        return await this.httpService.post(environment.apiRoutes.medicine.findByPzn, body);
    }
    
    public async findByPzns(body: FindMedicineByPznsRequestContract) : Promise<Medicine[]> {
        return await this.httpService.post(environment.apiRoutes.medicine.findByPzns, body);
    }
}
