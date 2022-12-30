interface IError {
    id: string;
    message: string;
}

export interface IResult<T, E extends IError | null> {
    readonly data: T;
    readonly error: E | null;
}
