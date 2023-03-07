const dotenv = require("dotenv")
dotenv.config()
const env = process.env.NODE_ENV?.trimEnd()
const DB_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    autoIndex: true,
    retryWrites: true 
}
const DB_USERNANE = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME
const DB_LOCAL_HOST = process.env.DB_LOCAL_HOST
const DB_LOCAL_PROTOCOL = process.env.DB_LOCAL_PROTOCOL
const DB_LIVE_HOST = process.env.DB_LIVE_HOST
const DB_LIVE_PROTOCOL = process.env.DB_LIVE_PROTOCOL
const DB_URI = env === 'production' ? `${DB_LIVE_PROTOCOL}${DB_USERNANE}:${DB_PASSWORD}@${DB_LIVE_HOST}/${DB_NAME}` : `${DB_LOCAL_PROTOCOL}${DB_LOCAL_HOST}/${DB_NAME}`
const DB = {
    username: DB_USERNANE,
    password: DB_PASSWORD,
    options: DB_OPTIONS,
    uri: DB_URI
} 

//server
const SERVER_PORT = process.env.SERVER_PORT || 9999
const SERVER_CORS_ORIGIN = process.env.SERVER_CORS_ORIGIN || '*'
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 'somesupersecret'

const SERVER = {
    port: SERVER_PORT,
    token:{
        secret:SERVER_TOKEN_SECRET
    },
    cors: {
        origin: SERVER_CORS_ORIGIN
    },
}

// EXPORT VARIABLES
exports.config = {
    db: DB,
    server: SERVER,

}