import {Controller} from "../controllers/controller";

export type IControllerType = new (...args: Array<any>) => Controller;