import * as e from 'express'

export abstract class Controller {
    public request!: e.Request;
    public response!: e.Response;

    public async start(req: e.Request, res: e.Response) {
        this.request = req;
        this.response = res;
        try {
            return this.handleRequest();
        } catch (err) {
            throw err;
        }
    }

    public abstract handleRequest(): Promise<any>;
}