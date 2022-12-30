import { Address } from "./Address";
import { OrderItem } from "./OrderItem";

export interface Order {
    id: string;
    timePlaced: Date;
    items: OrderItem[];
    shippingAddress: Address;
    billingAddress: Address;
    isCanceled: boolean;
}