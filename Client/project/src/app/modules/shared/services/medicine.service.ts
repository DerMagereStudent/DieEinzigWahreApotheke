import { Injectable } from '@angular/core';
import { MedicineSearchResult } from '../models/MedicineSearchResult';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { FindMedicineBySearchStringRequestContract } from '../contracts/FindMedicineBySearchStringRequestContract';

@Injectable()
export class MedicineService {

constructor(private httpService: HttpService) { }
    public async findBySearchString(body: FindMedicineBySearchStringRequestContract) : Promise<MedicineSearchResult> {
        return await this.httpService.post(environment.apiRoutes.medicine.findBySearchString, body);
    }
}
