import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { LoginRequestContract } from '../contracts/LoginRequestContract';
import { SignUpRequestContract } from '../contracts/SignUpRequestContract';
import { IdentityResult } from '../models/IdentityResult';

@Injectable()
export class UserService {

constructor(private httpService: HttpService) { }
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
    return await this.httpService.post(environment.apiRoutes.user.checkAuthenticated, {});
  }
}
