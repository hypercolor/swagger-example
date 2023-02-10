import {IControllerType} from "../types/i-controller-type";

export interface IMountedRoute {
    path: string,
    verb: string,
    controller: IControllerType | undefined
}