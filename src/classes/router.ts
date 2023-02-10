import {Router} from "express";
import {ApiRoutes} from "./api-routes";
import {IApiRouterOptions} from "../interfaces/i-api-router-options";
import {IMountedRoute} from "../interfaces/i-mounted-route";

export class ApiRouter {
    public router: Router = Router();
    private apiRoutes: Array<ApiRoutes> = [];

    constructor(private readonly options?: IApiRouterOptions) {
        this.options = options || {};
    }

    public get routes(): Array<IMountedRoute> {
        return this.apiRoutes.map(authenticatedRoute => {
            // console.log('controller ', authenticatedRoute.controller);
            return {
                path: authenticatedRoute.routePrefix,
                verb: authenticatedRoute.verb,
                controller: authenticatedRoute.controller
            };
        });
    }

    public static build(options: IApiRouterOptions, builder: (router: ApiRouter) => void) {
        const router = new ApiRouter(options);
        builder(router);
        return router;
    }

    public route(route: string) {
        const routes = new ApiRoutes(route, this.router, this.options!);
        this.apiRoutes.push(routes);
        return routes;
    }
}
