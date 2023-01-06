import { Address } from "./Address";

export interface UserInfo {
    email: string;
    title: string;
    firstName: string;
    lastName: string;
    roles: string[];
    addresses: Address[];
}  