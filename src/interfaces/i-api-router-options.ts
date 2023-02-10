import {RequestHandler} from "express";
import {IControllerType} from "../types/i-controller-type";



export interface IApiRouterOptions {
    middleware?: Array<RequestHandler>

    controllerBuilder?(controller: IControllerType): RequestHandler
}