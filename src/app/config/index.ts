import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join( process.cwd(), '.env') })


export default {
    node_env: process.env.NODE_ENV,
    database_url: process.env.DATABASE_URL,
    port: process.env.PORT,
    access_token_scret: process.env.JWT_ACCESS_SCRET
}

