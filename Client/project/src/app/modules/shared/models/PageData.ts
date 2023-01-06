export interface PageData<TData> {
    page: number;
    itemsPerPage: number;
    totalItemCount: number;
    items: TData[];
}