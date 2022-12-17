import { Medicine } from "./Medicine";

export interface MedicineSearchResult {
	pages: number;
	hits: number;
	page: number;
	pageContent: Medicine[]
}