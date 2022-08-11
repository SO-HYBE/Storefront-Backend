import { User, UserStore } from "../user";

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
    
    it('tests the create method', async ()=>{
        const result = await store.create({
            firstName: 'Andrew',
            lastName: 'Tate',
            userName: 'TopG',
            password: 'bugatti5m'
        });
        expect(result).toEqual({
            id:"2",
            firstName:"Andrew",
            lastName:"Tate",
            userName:"TopG",
            password:"bugatti5m"
        })
    });

    it('tests the index method', async ()=> {
        const result = await store.index();

        expect(result).toEqual([{
            id:"2",
            firstName:"Andrew",
            lastName:"Tate",
            userName:"TopG",
            password:"bugatti5m"
        }]);
    });

    it('tests the show method', async () => {
        const result = await store.show("2");
        expect(result).toEqual({
            id:"2",
            firstName:"Andrew",
            lastName:"Tate",
            userName:"TopG",
            password:"bugatti5m"
        });
    });

    it('tests the authenticate method' , async () => {
        const result = await store.authenticate("TopG","bugatti5m");
        expect(result).toEqual({
            id:"2",
            firstName:"Andrew",
            lastName:"Tate",
            userName:"TopG",
            password:"bugatti5m"
        });
    });

});