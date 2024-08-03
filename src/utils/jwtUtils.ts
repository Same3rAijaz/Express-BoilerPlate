import jwt from "jsonwebtoken";
import envConfig from "../../config";

export default class JwtUtils {

    static generateToken(payload: any) {
        return jwt.sign(payload, envConfig.jwtSecret as string);
    }

    static verifyToken(token: string) {
        return jwt.verify(token, envConfig.jwtSecret as string);
    }

    static decodeToken(token: string) {
        return jwt.decode(token);
    }

    static generateRefreshToken(payload: any) {
        return jwt.sign(payload, envConfig.refreshTokenSecret as string);
    }

    static verifyRefreshToken(token: string) {
        return jwt.verify(token, envConfig.refreshTokenSecret as string);
    }

    static decodeRefreshToken(token: string) {
        return jwt.decode(token);
    }
}
