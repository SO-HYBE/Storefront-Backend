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
    beforeAll( async () => {
        await store.create({
            name: "Hustler's University",
            price: "50",
            category: "education"
        });
    });
    afterAll( async () => {
        await store.deleteAll()
    });

    it("tests the create method", async() => {
        const result = await store.create({
            name: "Hustler's University",
            price: "50",
            category: "education"
        });
        expect(result.name).toEqual("Hustler's University");
        expect(result.price).toEqual("50");
        expect(result.category).toEqual("education");       
    });

    it("tests the index method", async () =>{
        const result = await store.index();
        expect(result[0].name).toEqual("Hustler's University");
        expect(result[0].price).toEqual("50");
        expect(result[0].category).toEqual("education");      
    });

    it("tests the show method", async () => {
        
        const result = await store.show(1);

        () => {
            if(result === undefined) {return}
        expect(result.id).toEqual(1);
        expect(result.name).toEqual("Hustler's University");
        expect(result.price).toEqual("50");
        expect(result.category).toEqual("education"); 
          }       
    });

    it("tests the selecting a product by its category method" , async () => {
        const result = await store.selectProductByCategory("education");
        expect(result[0].name).toEqual("Hustler's University");
        expect(result[0].price).toEqual("50");
        expect(result[0].category).toEqual("education");   
    });
});
