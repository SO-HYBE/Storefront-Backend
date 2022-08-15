import { Order, OrderStore } from "../order";
import { Product, ProductStore } from "../product";
import { User, UserStore } from "../user";

const store = new OrderStore();

describe("Order testing model", ()=> {

    const product = new ProductStore();
    const user = new UserStore();

    beforeAll( async ()=>{
        await user.create({
            firstname: "Darren",
            lastname: "Watkins",
            username: "ishowspeed",
            userpassword: "cristianobetter7"
        });
        await product.create({
            name: "Hustler's University",
            price: "50",
            category: "education"
        });
        await product.create({
            name: "Hustler's University",
            price: "50",
            category: "education"
        });
    });
    afterAll( async () => {
        await user.deleteAll();
        await product.deleteAll();
    });

    it("tests the availability of the get order by id method", ()=> {
        expect(store.selectOrdersById).toBeDefined();
    });

    it("tests the availability of the add a product to an order method", ()=> {
        expect(store.selectOrdersById).toBeDefined();
    });

    it("tests the availability of the create method", ()=> {
        expect(store.createOrder).toBeDefined();
    });

});