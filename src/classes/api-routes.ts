import {IRoute, RequestHandler, Router} from "express";
import {IApiRouterOptions} from "../interfaces/i-api-router-options";
import {IControllerType} from "../types/i-controller-type";

export class ApiRoutes {
    public verb = 'unknown';
    public controller?: IControllerType;
    private route: IRoute;
    private myMiddleware: Array<RequestHandler> = [];

    constructor(public routePrefix: string, router: Router, private opts: IApiRouterOptions) {
        this.route = router.route(routePrefix);
    }

    public use(middleware: RequestHandler) {
        this.myMiddleware.push(middleware);
        return this;
    }

    public get(controller: IControllerType | RequestHandler) {
        return this.handleMethod('get', controller);
    }

    public post(controller: IControllerType | RequestHandler) {
        return this.handleMethod('post', controller);
    }

    public put(controller: IControllerType | RequestHandler) {
        return this.handleMethod('put', controller);
    }

    public patch(controller: IControllerType | RequestHandler) {
        return this.handleMethod('patch', controller);
    }

    public delete(controller: IControllerType | RequestHandler) {
        return this.handleMethod('delete', controller);
    }

    public all(controller: IControllerType | RequestHandler) {
        return this.handleMethod('all', controller);
    }

    public options(controller: IControllerType | RequestHandler) {
        return this.handleMethod('options', controller);
    }

    public head(controller: IControllerType | RequestHandler) {
        return this.handleMethod('head', controller);
    }

    private handleMethod(name: string, handler: IControllerType | RequestHandler) {

        this.controller = handler as IControllerType;

        this.verb = name;

        if (this.opts.controllerBuilder) {
            handler = this.opts.controllerBuilder(handler as IControllerType);
        }
        (this.route as any)[name](...this.buildMiddlewareArray(), handler);

        return this;
    }

    private buildMiddlewareArray() {
        let handlers: Array<any> = [];
        if (this.opts.middleware) {
            handlers = handlers.concat(this.opts.middleware);
        }
        return handlers.concat(this.myMiddleware);
    }
}