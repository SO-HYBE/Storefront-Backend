import express, { Request, Response } from 'express'
import supertest from 'supertest';
import { OrderStore } from '../../models/order';
import { ProductStore } from '../../models/product';
import { UserStore } from '../../models/user';
import app from '../../server'

const request = supertest(app);

describe("It tests the endpoints in the api", () => {

    const product = new ProductStore();
    const user = new UserStore();
    const order = new OrderStore();
    
    beforeAll( async ()=>{
        await product.create({
            name: "Hustler's University",
            price: "50",
            category: "education"
        });
        await user.create({
            firstname: "Darren",
            lastname: "Watkins",
            username: "ishowspeed",
            userpassword: "cristianobetter7"
        });   
    }); 
    afterAll( async () => {
        await user.deleteAll();
        await product.deleteAll();
        await order.deleteAll();
    });

        it('tests the api endpoint status', async (): Promise<void> => {
            const response = await request.get('/');
            expect(response.status).toBe(200);
        });
        it('tests successful access to the api endpoint ', async (): Promise<void> => {
            const response = await request.get('/');
            expect(response.status === 400).toBeFalsy();
        });
        it("tests the connection of the orders endpoint", async (): Promise<void> => {
            const response = await request.get('/orders');
            //gets error 401 Unauthorized because no token passed. If token was passed the status would be 200
            expect(response.status).toBe(401);
        });        
        it('tests the orders select order by id endpoint status', async (): Promise<void> => {
            const response = await request.get('/orders/1');
            //gets error 401 Unauthorized because no token passed. If token was passed the status would be 200
            expect(response.status).toBe(401);
        });
        it('tests the products index endpoint status', async (): Promise<void> => {
            await product.create({
            name: "Hustler's University",
            price: "50",
            category: "education"
            });
            const response = await request.get('/products');
            expect(response.status).toBe(200);
        });
        it('tests the products show endpoint status', async (): Promise<void> => {
            const response = await request.get('/products/1');
            expect(response.status).toBe(200);
        });
        it('tests the products category endpoint status', async (): Promise<void> => {
            const response = await request.get('/products/category/sports');
            expect(response.status).toBe(200);
        });
        it('tests the users delete endpoint status', async (): Promise<void> => {
            const response = await request.get('/users/delete');
            //gets error 401 Unauthorized because no token passed. If token was passed the status would be 200
            expect(response.status).toBe(401);
        });
        it('tests the users show endpoint status', async (): Promise<void> => {
            const response = await request.get('/users/1');
            //gets error 401 Unauthorized because no token passed. If token was passed the status would be 200
            expect(response.status).toBe(401);
        }); 
        it('tests the users index endpoint status', async (): Promise<void> => {
            const response = await request.get('/users');
            //gets error 401 Unauthorized because no token passed. If token was passed the status would be 200
            expect(response.status).toBe(401);
        });    
});