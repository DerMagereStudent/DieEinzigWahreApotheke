export interface ApplicationError {
    code: string,
    description: string
}

export interface ApplicationResult<TData> {
    succeeded: boolean,
    errors: ApplicationError[],
    data?: TData
}