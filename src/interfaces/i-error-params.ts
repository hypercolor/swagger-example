export interface IErrorParams {
    code: number;
    error?: string | object | Error;
    stack?: string;
    message?: string;
}