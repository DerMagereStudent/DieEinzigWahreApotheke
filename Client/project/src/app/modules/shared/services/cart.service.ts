import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { ApplicationResult } from '../models/ApplicationResult';
import { AddCartItemRequestContract } from '../contracts/cart/AddCartItemRequestContract';
import { RemoveCartItemRequestContract } from '../contracts/cart/RemoveCartItemRequestContract';
import { UpdateCartItemQuantityRequestContract } from '../contracts/cart/UpdateCartItemQuantityRequestContract';
import { ShoppingCartItem } from '../models/ShoppingCartItem';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    public cart: BehaviorSubject<ShoppingCartItem[]> = new BehaviorSubject<ShoppingCartItem[]>([]);

    constructor(private httpService: HttpService) { }

    public async getCart() : Promise<ApplicationResult<ShoppingCartItem[]>> {
        return await this.httpService.get(environment.apiRoutes.cart.index)
            .then((result: ApplicationResult<ShoppingCartItem[]>) => {
                console.log(result);
                if (result.succeeded)
                    this.cart.next(result.data!);
                
                return result;
            });
    }

    public async addToCart(body: AddCartItemRequestContract) : Promise<ApplicationResult<void>> {
        return await this.httpService.post(environment.apiRoutes.cart.index, body);
    }

    public async removeFromCart(body: RemoveCartItemRequestContract) : Promise<ApplicationResult<void>> {
        return await this.httpService.delete(environment.apiRoutes.cart.index, body);
    }

    public async updateQuantity(body: UpdateCartItemQuantityRequestContract) : Promise<ApplicationResult<void>> {
        return await this.httpService.put(environment.apiRoutes.cart.index, body);
    }
}
