import { HttpMethod, LogLevel, RouteHandler, Message } from "./types";

interface IQuery {
    sql: string;
    params?: any;
}

interface IDatabase {
    connect(): Promise<void>;
    run<T>(query: IQuery): Promise<Array<T>>;
}

interface IMessagePublisher {
    publishMessage(topic: string, message: Message): Promise<void>
}

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

interface IServer {
    route(method: HttpMethod, path: string, handler: RouteHandler): void;
    start(port: number): Promise<void>;
    stop(): Promise<void>;
}

interface ILogger {
    log: (level: LogLevel, message: string) => void
}

export {
    IDatabase,
    IQuery,
    IRequest,
    IResponse,
    IServer,
    ILogger,
    IMessagePublisher,
};
