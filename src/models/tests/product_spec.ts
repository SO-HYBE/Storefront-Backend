import { Product, ProductStore } from "../product";

const store = new ProductStore();

describe("Product testing model", ()=>{
    it('tests the availability of the index method', ()=>{
        expect(store.index).toBeDefined();
    });

    it('tests the availability of the show method', ()=>{
        expect(store.show).toBeDefined();
    });

    it('tests the availability of the create method', ()=>{
        expect(store.create).toBeDefined();
    });

    it("tests the availability of the selecting a product by its category method", ()=>{
        expect(store.selectProductByCategory).toBeDefined();
    });

    it("tests the create method", async() => {
        const result = await store.create({
            name: "Hustler's University",
            price: "50",
            category: "education"
        });
        expect(result).toEqual({
            id:"2",
            name:"Hustler's University",
            price: "50",
            category: "education"
        });
    });

    it("tests the index method", async () =>{
        const result = await store.index();

        expect(result).toEqual([{
            id:"2",
            name:"Hustler's University",
            price: "50",
            category: "education"
        }]);
    });

    it("tests the show method", async () => {
        const result = await store.show("2");

        expect(result).toEqual({
            id:"2",
            name:"Hustler's University",
            price: "50",
            category: "education"
        })
    });

    it("tests the selecting a product by its category method" , async () => {
        const result = await store.selectProductByCategory({
            name: "Hustler's University",
            price: "50",
            category: "education"
        });
        expect(result).toEqual([{
            id:"2",
            name:"Hustler's University",
            price: "50",
            category: "education"
        }]);
    });
});
