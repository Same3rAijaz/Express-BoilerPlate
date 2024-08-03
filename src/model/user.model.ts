import { model, Schema } from "mongoose";

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin'
}
const UserSchema = new Schema({
    fullName: { type: String, required: true },
    profilePicUrl: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: true },
    role: { type: String, required: true, default: UserRole.USER, enum: [UserRole.USER, UserRole.ADMIN] },
    district: { type: String, required: false },
    dateOfBirth: { type: Date, required: false },
    phoneNumber: { type: String, required: true },
    meta: { type: Object, required: false },
    deleted: { type: Boolean, required: false, default: false },
    active: { type: Boolean, required: false, default: true }
}, {
    timestamps: true
})

export default model('User', UserSchema);