import asyncHandler from "../../helpers/asyncHandler";
import { Request, Response, NextFunction } from "express";
import { SuccessResponse } from "../../utils/ApiResponse";
import User, { UserRole } from "../../model/user.model";
import PasswordUtils from "../../utils/passwordUtils";
import JwtUtils from "../../utils/jwtUtils";
import { BadRequestError } from "../../utils/ApiError";
export default class userController {
    model = User
    getAll = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        if (req.user.role !== UserRole.ADMIN) {
            throw new BadRequestError('Unauthorized');
        }
        const users = await this.model.find();
        return new SuccessResponse('Users fetched successfully', users).send(res);
    })
    getOne = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        const userId = req.user.role === UserRole.ADMIN ? req.params.id : req.user._id
        const user = await this.model.findById(userId);
        return new SuccessResponse('User fetched successfully', user).send(res);
    })
    create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const oldUser = await this.model.findOne({ phoneNumber: req.body.phoneNumber, deleted: false });
        if (!req?.body?.phoneNumber) {
            throw new BadRequestError('Phone number is required');
        }
        if (oldUser) {
            throw new BadRequestError('User already exists');
        }
        const user = await this.model.create(req.body);
        const token = JwtUtils.generateToken({ _id: user._id, role: user.role });
        if (req.body.password) {
            req.body.password = await PasswordUtils.hashPassword(req.body.password)
        }
        return new SuccessResponse('User created successfully', { user, token }).send(res);
    })
    update = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        let userId = req.user.role === UserRole.ADMIN ? req.params.id : req.user._id
        if (req.body.password) {
            req.body.password = await PasswordUtils.hashPassword(req.body.password)
        }
        const user = await this.model.findByIdAndUpdate(userId, req.body);
        return new SuccessResponse('User updated successfully', user).send(res);
    })
    delete = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
        let userId = req.user.role === UserRole.ADMIN ? req.params.id : req.user._id
        const user = await this.model.findByIdAndUpdate(userId, { active: false, deleted: true });
        return new SuccessResponse('User deleted successfully', user).send(res);
    })
    signIn = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.model.findOne({ phoneNumber: req.body.phoneNumber });
        if (!user) {
            return new SuccessResponse('User not found', null).send(res);
        } else if (await PasswordUtils.comparePassword(req.body.password, user.password)) {
            const token = JwtUtils.generateToken({ _id: user._id, role: user.role });
            return new SuccessResponse('User signed in successfully', { user, token }).send(res);
        } else {
            throw new BadRequestError('Invalid credentials');
        }
    })
    forgetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.model.findOne({ phoneNumber: req.body.phoneNumber });
        if (!user) {
            throw new BadRequestError('User not found');
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        return new SuccessResponse('OTP sent successfully', { otp }).send(res);
    })
    resetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.model.findOne({ phoneNumber: req.body.phoneNumber });
        if (!user) {
            throw new BadRequestError('User not found');
        }
        const systemOtp = 1000
        if (systemOtp === req.body.otp) {
            user.password = await PasswordUtils.hashPassword(req.body.password)
            await user.save()
            return new SuccessResponse('Password reset successfully', null).send(res);
        }
        throw new BadRequestError('Invalid OTP');
    })
}