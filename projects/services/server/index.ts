import express, {
    Express,
    Request,
    Response,
    NextFunction,
} from "express";
import type { Server as HttpServer } from "http";
import {
    HttpMethod,
    IRequest,
    IResponse,
    IServer,
    RouteHandler,
} from "example-repo-common";

class RequestAdapter implements IRequest {
    params: Record<string, string>;
    query: Record<string, any>;
    body: any;
    headers: Record<string, string | string[] | undefined>;

    constructor(req: Request) {
        this.params = req.params as Record<string, string>;
        this.query = req.query as Record<string, any>;
        this.body = req.body;
        this.headers = req.headers;
    }
}

class ResponseAdapter implements IResponse {
    private res: Response;

    constructor(res: Response) {
        this.res = res;
    }

    status(code: number): IResponse {
        this.res.status(code);
        return this;
    }

    json(body: any): IResponse {
        this.res.json(body);
        return this;
    }

    send(body?: any): IResponse {
        this.res.send(body);
        return this;
    }
}

export default class Server implements IServer {
    private app: Express;
    private httpServer?: HttpServer;

    constructor() {
        this.app = express();
        this.app.use(express.json());
    }

    route(method: HttpMethod, path: string, handler: RouteHandler): void {
        this.app[method](
            path,
            async (req: Request, res: Response, next: NextFunction) => {
                try {
                    await handler(
                        new RequestAdapter(req),
                        new ResponseAdapter(res),
                    );
                } catch (err) {
                    next(err);
                }
            },
        );
    }

    start(port: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const server = this.app.listen(port, () => resolve());
            server.once("error", reject);
            this.httpServer = server;
        });
    }

    stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.httpServer) {
                resolve();
                return;
            }
            this.httpServer.close((err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    }
}
