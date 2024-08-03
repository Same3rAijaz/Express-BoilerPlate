import { Request, Response, NextFunction } from "express";
import { BadRequestResponse } from "../utils/ApiResponse";
import logsModel from "../model/logs.model";
type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const asyncHandler = (execution: AsyncFunction) => (
    req: any,
    res: any,
    next: NextFunction
) => {
    return logsModel.create(
        {
            route: req.originalUrl,
            method: req.method,
            requestBody: req.body,
            requestParams: req.params,
            requestQuery: req.query,
            requestHeaders: req.headers,
            requestIp: req.ip,
            // response: res,
            responseStatus: res.statusCode,
            responseHeaders: res.getHeaders(),
        }).then((log) => {
            res.logId = log._id
            req.logId = log._id
            return Promise
                .resolve(execution(req, res, next))
                .catch((error) => new BadRequestResponse(error?.message).send(res));

        })

}

export default asyncHandler;
