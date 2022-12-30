import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { LoginRequestContract } from '../contracts/user/LoginRequestContract';
import { SignUpRequestContract } from '../contracts/user/SignUpRequestContract';
import { IdentityResult } from '../models/IdentityResult';
import { BehaviorSubject } from 'rxjs';
import { Address } from '../models/Address';
import { ApplicationResult } from '../models/ApplicationResult';

@Injectable({
  providedIn: 'root',
})
export class UserService {

constructor(private httpService: HttpService) { }
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public async login(body: LoginRequestContract) : Promise<IdentityResult> {
    return await this.httpService.post(environment.apiRoutes.user.login, body);
  }

  public async signup(body: SignUpRequestContract) : Promise<IdentityResult> {
    return await this.httpService.post(environment.apiRoutes.user.signup, body);
  }

  public async logout() : Promise<IdentityResult> {
    return await this.httpService.post(environment.apiRoutes.user.logout, {});
  }

  public async checkAuthenticated() : Promise<boolean> {
    return await this.httpService.post(environment.apiRoutes.user.checkAuthenticated, {}).then(result => {this.isLoggedIn.next(result); return result;});
  }

  public async getAddresses(): Promise<ApplicationResult<Address[]>> {
    return await this.httpService.get(environment.apiRoutes.user.addresses);
  }
}
