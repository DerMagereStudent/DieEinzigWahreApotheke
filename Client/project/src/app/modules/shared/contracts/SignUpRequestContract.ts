import { Address } from "../models/Address";

export interface SignUpRequestContract {
	email: string;
	password: string;

	title: string
	firstName: string
	lastName: string
	birthday: Date
	address: Address;
}