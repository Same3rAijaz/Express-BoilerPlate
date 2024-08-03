import { Router } from "express";
import authMiddleware from "../../middleware/authMiddleware";
import userController from "../../controller/userController";
export default class userRouter {
    readonly router: Router = Router();
    readonly controller: userController = new userController();
    constructor() {
        this.initRoutes();
    }
    initRoutes() {
        this.router.post('/signup', this.controller.create);
        this.router.post('/login', this.controller.signIn);
        this.router.get('/', authMiddleware, this.controller.getOne);
        this.router.get('/all', authMiddleware, this.controller.getAll);
        this.router.put('/:id?', authMiddleware, this.controller.update);
        this.router.delete('/:id?', authMiddleware, this.controller.delete);
        this.router.post('/forget-password', this.controller.forgetPassword);
        this.router.post('/reset-password', this.controller.resetPassword);
    }
}

