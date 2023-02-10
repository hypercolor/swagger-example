import {Controller} from "../controllers/controller";

export interface IControllerResponseType {
    successCode?: number;
    failureCode?: number;

    new (): Controller;
}