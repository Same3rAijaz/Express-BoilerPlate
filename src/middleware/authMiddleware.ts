import JwtUtils from "../utils/jwtUtils";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../utils/ApiError";
import { BadRequestResponse } from "../utils/ApiResponse";

export default (req: any, res: Response, next: NextFunction) => {
    try {


        const token = req.headers["authorization"];
        if (!token) {
            return new BadRequestError("Access token required");
        }

        const accessToken = token.split(" ")[1];
        if (!accessToken) {
            return new BadRequestError("Access token required");
        }

        const decoded = JwtUtils.decodeToken(accessToken);
        if (!decoded) {
            return new BadRequestError("Invalid access token");
        }

        req.user = decoded;
        next();
    } catch (error: Error | any) {
        return new BadRequestResponse(error?.message).send(res);
    }
}