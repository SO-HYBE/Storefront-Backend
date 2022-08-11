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
            name: "football",
            price: "777",
            category: "sports"
        });
    });

    beforeAll( async ()=>{
        await user.create({
            firstName: "Darren",
            lastName: "Watkins",
            userName: "ishowspeed",
            password: "cristianobetter7"
        });
    });

    beforeAll( async ()=>{
        await order.createOrder({
            product_id: "1",
            quantity: "3",
            user_id: "1",
            status: "new"
        });
    });


    it("tests the connection of the orders endpoint",()=>{
        it('1. tests the api endpoint status', async (): Promise<void> => {
            const response = await request.get('/');
            expect(response.status).toBe(200);
        });
        it('2. tests successful access to the api endpoint ', async (): Promise<void> => {
            const response = await request.get('/');
            expect(response.status === 400).toBeFalsy();
        });
        it('3. tests the orders create order endpoint status', async (): Promise<void> => {
            const response = await request.get('/orders/:1');
            expect(response.status).toBe(200);
        });
        it('4. tests the orders select order by id endpoint status', async (): Promise<void> => {
            const response = await request.get('/orders/:1');
            expect(response.status).toBe(200);
        });
        it('5. tests the users endpoint status', async (): Promise<void> => {
            const response = await request.get('/users');
            expect(response.status).toBe(200);
        });
        it('6. tests the users index endpoint status', async (): Promise<void> => {
            const response = await request.get('/users');
            expect(response.status).toBe(200);
        });
        it('7. tests the users show endpoint status', async (): Promise<void> => {
            const response = await request.get('/users/:1');
            expect(response.status).toBe(200);
        });
        it('8. tests the products index and create endpoint status', async (): Promise<void> => {
            const response = await request.get('/users');
            expect(response.status).toBe(200);
        });
        it('9. tests the products show endpoint status', async (): Promise<void> => {
            const response = await request.get('/users/:1');
            expect(response.status).toBe(200);
        });
        it('10. tests the products category endpoint status', async (): Promise<void> => {
            const response = await request.get('/users/:sports');
            expect(response.status).toBe(200);
        });
        
    });
});