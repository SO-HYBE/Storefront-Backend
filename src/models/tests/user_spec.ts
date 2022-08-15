import { User, UserStore } from "../user";
import bcrypt from 'bcrypt'
require('dotenv').config();


const store = new UserStore();

describe('User testing model', ()=> {
    it('tests the availability of the index method', ()=>{
        expect(store.index).toBeDefined();
    });
    
    it('tests the availability of the show method', ()=>{
        expect(store.show).toBeDefined();
    });
    
    it('tests the availability of the create method', ()=>{
        expect(store.create).toBeDefined();
    });
    
    it('tests the availability of the authenticate method', ()=>{
        expect(store.authenticate).toBeDefined();
    });
    beforeAll( async () => {
        await store.create({
            firstname: "Darren",
            lastname: "Watkins",
            username: "ishowspeed",
            userpassword: "cristianobetter7"
        });
    });
    afterAll( async ()=> {
        await store.deleteAll();
    });
    
    it('tests the create method', async ()=>{
        const result = await store.create({
            firstname: "Darren",
            lastname: "Watkins",
            username: "ishowspeed",
            userpassword: "cristianobetter7"
        });
        expect(result.firstname).toEqual("Darren")
        expect(result.lastname).toEqual("Watkins")
        expect(result.username).toEqual("ishowspeed")
        expect(result.userpassword).not.toEqual("cristianobetter7")
    });

    it('tests the index method', async ()=> {
        const result = await store.index();
        expect(result[0].firstname).toEqual("Darren");
        expect(result[0].lastname).toEqual("Watkins");
        expect(result[0].userpassword).not.toEqual("cristianobetter7")
    });

    it('tests the show method', async () => {
        const result = await store.show(1);
        () => {
            if(result === undefined) {return}      
        expect(result.id).toEqual(1);
        expect(result.firstname).toEqual("Darren");
        expect(result.lastname).toEqual("Watkins");
        expect(result.userpassword).not.toEqual("cristianobetter7")
          }
        
    });

    it('tests the authenticate method' , async () => {
        const result: User | null = await store.authenticate("ishowspeed","cristianobetter7");
        expect((result as User).id).toBeUndefined;
        expect((result as User).firstname).toBeUndefined;
        expect((result as User).lastname).toBeUndefined;
        expect((result as User).userpassword).not.toEqual("cristianobetter7")
    });

});