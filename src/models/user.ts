//@ts-ignore

import database from '../database'
import bcrypt from 'bcrypt'
require('dotenv').config();

export type User = {
    id?: number,
    firstname: string,
    lastname: string,
    username: string,
    userpassword: string
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

    async show(id: number): Promise<User> {
        try {

        // @ts-ignore
        const conn = await database.connect()

        const sql = 'SELECT * FROM users WHERE id = ($1)'
        
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
      
      // @ts-ignore
      const conn = await database.connect()

      const sql = 'INSERT INTO users (firstname, lastname, username, userpassword) VALUES($1, $2, $3, $4) RETURNING *'
      
      const hash = bcrypt.hashSync(
        b.userpassword + process.env.BCRYPT_PASSWORD,
        parseInt(process.env.SALT_ROUNDS as string)
      )

      const result = await conn
          .query(sql, [b.firstname, b.lastname, b.username, hash])
  
      const user : User = result.rows[0]
  
      conn.release()

        return user;

        } catch (err) {
            throw new Error(`Could not create new user : ${b.username}. Error: ${err}`)
        }
    }
    async authenticate(username: string, userpassword: string): Promise<User | null> {
      // @ts-ignore
        const conn = await database.connect()
        const sql = 'SELECT userpassword FROM users WHERE username=($1)'
    
        const result = await conn.query(sql, [username])
    
        console.log(userpassword+process.env.BCRYPT_PASSWORD)
    
        if(result.rows.length) {
    
          const user = result.rows[0]
    
          console.log(user)
    
          if (bcrypt.compareSync(userpassword+process.env.BCRYPT_PASSWORD, user.userpassword)) {
            return user
          }
        }
    
        return null
      }
      async deleteAll(): Promise<User> {
        try {
          //@ts-ignore
          const conn = await database.connect();
          const sql = 'DELETE FROM users RETURNING *';
          const result = await conn.query(sql);
          conn.release();
    
          return result.rows;
        } catch (err) {
          throw new Error(`Users can not be deleted . Error: ${err}`);
        }
      }
}