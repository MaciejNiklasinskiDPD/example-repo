interface IQuery {
    sql: string;
    params?: any;
}

interface IDatabase {
    connect(): Promise<void>;
    run<T>(query: IQuery): Promise<Array<T>>;
}

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

interface IRequest {
    params: Record<string, string>;
    query: Record<string, any>;
    body: any;
    headers: Record<string, string | string[] | undefined>;
}

interface IResponse {
    status(code: number): IResponse;
    json(body: any): IResponse;
    send(body?: any): IResponse;
}

type RouteHandler = (req: IRequest, res: IResponse) => void | Promise<void>;

interface IServer {
    route(method: HttpMethod, path: string, handler: RouteHandler): void;
    start(port: number): Promise<void>;
    stop(): Promise<void>;
}

export {
    IDatabase,
    IQuery,
    IRequest,
    IResponse,
    IServer,
    HttpMethod,
    RouteHandler,
};
