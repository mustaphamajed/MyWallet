import { config } from 'dotenv'
config()

const Config = {
    ENV: process.env.NODE_ENV, 
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_PASSWORD, 
    DB: {
        CONNECTION_STRING: process.env.CONNECTION_STRING
    }
}


export default Config