//@ts-ignore

import database from '../database'
import bcrypt from 'bcrypt'
require('dotenv').config();

export type User = {
    id?: string,
    firstName: string,
    lastName: string,
    userName: string,
    password: string
}


export class UserStore {
    async index(): Promise<User[]> {
        try {
            //@ts-ignore
            const conn = await database.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)

            conn.release()
            return result.rows
        } catch (err) {
            throw new Error (`Could not get users. Error ${err}`)
        }
    }

    async show(id: string): Promise<User> {
        try {
        const sql = 'SELECT * FROM users WHERE id=($1)'
        // @ts-ignore
        const conn = await database.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
      }

    async create(b: User): Promise<User> {
        try {
      // @ts-ignore
      const sql = 'INSERT INTO users (firstname, lastname, username, password) VALUES($1, $2, $3) RETURNING *'
      // @ts-ignore
      const conn = await database.connect()

      const hash = bcrypt.hashSync(
        b.password + process.env.BCRYPT_PASSWORD,
        parseInt(process.env.SALT_ROUNDS as string)
      )

      const result = await conn
          .query(sql, [b.firstName, b.lastName, b.userName, hash])
  
      const user = result.rows[0]
  
      conn.release()
  
      return user
        } catch (err) {
            throw new Error(`Could not create new user : ${b.userName}. Error: ${err}`)
        }
    }
    async authenticate(userName: string, password: string): Promise<User | null> {
      // @ts-ignore
        const conn = await database.connect()
        const sql = 'SELECT password_digest FROM users WHERE username=($1)'
    
        const result = await conn.query(sql, [userName])
    
        console.log(password+process.env.BCRYPT_PASSWORD)
    
        if(result.rows.length) {
    
          const user = result.rows[0]
    
          console.log(user)
    
          if (bcrypt.compareSync(password+process.env.BCRYPT_PASSWORD, user.password_digest)) {
            return user
          }
        }
    
        return null
      }
}