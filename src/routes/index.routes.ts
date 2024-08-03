import userRouter from "./userRoutes/user.routes";

import { Router } from "express";


export default class Routes {
    router: Router
    constructor() {
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.use('/user', new userRouter().router);
    }
}