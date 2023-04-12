export interface HttpResponse<T> {
    statusCode: HttpStatusCode
    body: T 
}

export interface HttpRequest<B> {
    body?: B,
    params?: any
    headers?: any
}

export interface IController {
    handle(httpResquest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>
        // unknown o tipo vai ser definido quando eu de fato usar o método, no momento eu não sei
}

export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    SERVER_ERROR = 500,
}