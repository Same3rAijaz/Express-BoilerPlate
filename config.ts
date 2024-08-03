import 'dotenv/config';

export default {
    mongoURI: process.env.MONGO_URI,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    messageService: {
        isEnabled: process.env.IS_MESSAGE_ENABLED || false,
        url: process.env.MSG_SERVICE_URL,
        auth: process.env.MSG_SERVICE_AUTH,
        sender: process.env.MSG_SERVICE_SENDER
    },
}