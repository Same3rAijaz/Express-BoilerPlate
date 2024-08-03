import { Schema, model } from "mongoose";

const LogsSchema = new Schema({
    route: { type: String, required: false },
    method: { type: String, required: false },
    requestBody: { type: Object, required: false },
    request: { type: Object, required: false },
    response: { type: Object, required: false },
    responseStatus: { type: Number, required: false },
    responseHeaders: { type: Object, required: false },
    responseBody: { type: Object, required: false },
    requestParams: { type: Object, required: false },
    requestQuery: { type: Object, required: false },
    requestHeaders: { type: Object, required: false },
    requestIp: { type: String, required: false },
    deleted: { type: Boolean, required: false, default: false }
}, { timestamps: true });

export default model('Logs', LogsSchema)
