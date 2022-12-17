export interface Medicine {
	pzn: string;
	productName: string;
	manufacturer: string;
	pharmaForm: string;
	requiresPrescription: boolean;

	description: string;
	imageLink: string;
	ifap: string;

	status: string;
	inStock: boolean;
	price?: number;
	priceFormatted?: string;
	packSize?: string;
	pricePerUnit?: string;
}