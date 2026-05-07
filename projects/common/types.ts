import { IRequest, IResponse } from "./interfaces";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

type RouteHandler = (req: IRequest, res: IResponse) => void | Promise<void>;

type LogLevel = "error" | "warn" | "info" | "http" | "verbose" | "debug" | "silly";


type Message = {
    data?: string,
    attributes?: Record<string, string>
};

export {
    HttpMethod,
    RouteHandler,
    LogLevel,
    Message
};
