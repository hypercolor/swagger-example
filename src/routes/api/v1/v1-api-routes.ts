import {ApiRouter} from "../../../classes/router";
import {HelloController} from "./hello/get";
import * as e from 'express';
import {ControllerFactory} from "../../../classes/controller-factory";

export class V1ApiRoutes {
    public static buildAndMountRoutes(expressApp: e.Application, mountPoint: string) {
        const routers = [
            ApiRouter.build({
                controllerBuilder: ControllerFactory.jsonApi,
                middleware: []
            }, router => {
            router.route('/hello').get(HelloController);
            })
        ];

        routers.forEach(router => {
            expressApp.use(mountPoint, router.router);
        });

        return routers;
    }
}