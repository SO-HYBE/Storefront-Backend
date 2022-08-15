import dotenv from 'dotenv'

import { Pool } from 'pg'

dotenv.config();


const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB_TEST,
    ENV
} = process.env

let database

if (ENV ==='test') {
    database = new Pool({
        host:POSTGRES_HOST,
        database:POSTGRES_DB_TEST,
        user:POSTGRES_USER,
        password:POSTGRES_PASSWORD
    });
}

if (ENV==='dev') {
    database = new Pool ({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}
console.log(ENV)

export default database;