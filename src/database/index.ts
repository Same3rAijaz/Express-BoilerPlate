import { connect } from "mongoose"
import config from "../../config"


export default async function () {
    return await connect(config.mongoURI as any)
}