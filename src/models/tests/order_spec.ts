import { Order, OrderStore } from "../order";
import { Product, ProductStore } from "../product";
import { User, UserStore } from "../user";

const store = new OrderStore();

describe("Order testing model", ()=> {

    const product = new ProductStore();
    const user = new UserStore();
    
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

    it("tests the availability of the get order by id method", ()=> {
        expect(store.selectOrdersById).toBeDefined();
    });

    it("tests the availability of the create method", ()=> {
        expect(store.createOrder).toBeDefined();
    });

    it("tests the create order method", async ()=> {
        const result = await store.createOrder({
            product_id: "1",
            quantity: "3",
            user_id: "1",
            status: "new"
        });
        expect(result).toEqual({
            id:"1",
            product_id: "1",
            quantity: "3",
            user_id: "1",
            status: "new"
        });
    })

    it("tests the get order by id method", async ()=>{
        const result = await store.selectOrdersById('1');
        expect (result).toEqual([{
            id:"1",
            product_id: "1",
            quantity: "3",
            user_id: "1",
            status: "new"
        }])
    });
});