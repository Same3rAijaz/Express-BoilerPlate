import bcrypt from 'bcryptjs';


export default class PasswordUtils {

    static hashPassword(password: string) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }

    static comparePassword(password: string, hash: string) {
        return bcrypt.compareSync(password, hash);
    }

}