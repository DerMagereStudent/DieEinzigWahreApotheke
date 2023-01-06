import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { LoginRequestContract } from '../contracts/user/LoginRequestContract';
import { SignUpRequestContract } from '../contracts/user/SignUpRequestContract';
import { IdentityResult } from '../models/IdentityResult';
import { BehaviorSubject } from 'rxjs';
import { Address } from '../models/Address';
import { GetOrdersRequestContract } from '../contracts/order/GetOrderRequestContract';
import { ApplicationResult } from '../models/ApplicationResult';
import { Order } from '../models/Order';
import { PlaceOrderRequestContract } from '../contracts/order/PlaceOrderRequestContract';
import { CancelOrderRequestContract } from '../contracts/order/CancelOrderRequestContract';
import { PageData } from '../models/PageData';
import { GetOrdersToApproveRequestContract } from '../contracts/order/GetOrdersToApproveRequestContract';
import { ApproveOrderRequestContract } from '../contracts/order/ApproveOrderRequestContract';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

constructor(private httpService: HttpService) { }
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public async getOrders(data: GetOrdersRequestContract) : Promise<ApplicationResult<PageData<Order>>> {
    return await this.httpService.get(environment.apiRoutes.order.index + `?page=${data.page}&itemsPerPage=${data.itemsPerPage}`);
  }

  public async placeOrder(body: PlaceOrderRequestContract) : Promise<ApplicationResult<string>> {
    return await this.httpService.post(environment.apiRoutes.order.index, body);
  }

  public async cancelOrder(body: CancelOrderRequestContract) : Promise<ApplicationResult<void>> {
    return await this.httpService.delete(environment.apiRoutes.order.index, body);
  }

  public async getOrdersToApprove(data: GetOrdersToApproveRequestContract) : Promise<ApplicationResult<PageData<Order>>> {
    return await this.httpService.get(environment.apiRoutes.order.approve + `?page=${data.page}&itemsPerPage=${data.itemsPerPage}`);
  }

  public async approveOrder(body: ApproveOrderRequestContract) : Promise<ApplicationResult<void>> {
    return await this.httpService.post(environment.apiRoutes.order.approve, body);
  }
}
