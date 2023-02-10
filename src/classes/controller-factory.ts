import {Controller} from "../controllers/controller";
import * as e from 'express';
import * as util from 'util';
import {IControllerResponseType} from "../interfaces/i-controller-response-type";
import {IOkParams} from "../interfaces/i-ok-params";
import {IErrorParams} from "../interfaces/i-error-params";


export class ControllerFactory {
    public static jsonApi(controllerType: IControllerResponseType): e.RequestHandler {
        return (req: e.Request, res: e.Response, next: e.NextFunction) => {
            const controller = new controllerType();
            ControllerFactory.runJsonApi(controller, req, res)
        }
    }

    private static runJsonApi(controller: Controller, req: e.Request, res: e.Response) {

        controller.start(req, res)
            .then((result) => {
                if (util.types.isPromise(result)) {
                    console.log("Warning, handler result is a promise, did you forget to await?");
                }
                const payload = { code: 200, data: result };

                if (result === undefined) {
                    return this.send204(res);
                } else {
                    return this.sendOkResponse(res)(payload);
                }
            })
            .catch((handlerError) => {
                handlerError = handlerError || {};
                const code = handlerError.statusCode || 500;
                const error = handlerError.error || handlerError.response || handlerError.message || handlerError;
                console.log("Error " + code + " during request: " + JSON.stringify(error));
                if (handlerError.stack) {
                    console.log("stack: " + handlerError.stack);
                }
                this.sendErrorResponse(req, res)({code, error, stack: handlerError.stack});
            });
    }

    private static send204(res: e.Response) {
        res.status(204).send();
    }

    private static sendOkResponse(res: e.Response) {
        return async (params: IOkParams) => {
            const code = params.code || 200;
            const responseBody = params.data;
            res.status(code).json(responseBody);
        };
    }

    private static sendErrorResponse(req: e.Request, res: e.Response) {
        return async (params: IErrorParams) => {
            let code = 500;
            let meta;
            if (params.code && typeof params.code === 'number' && params.code < 600) {
                code = params.code;
            } else {
                meta = "Error code: " + params.code;
            }

            const error: any =
                params.error && params.error.constructor === Error
                    ? (params.error as Error).message
                    : params.error;
            const stack =
                params.error && params.error.constructor === Error
                    ? (params.error as Error).stack
                    : params.stack;


            res.status(code).json({error, meta, stack});
        };
    }
}
