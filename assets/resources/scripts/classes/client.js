import { Person } from './person.js';

export class Client extends Person{
    constructor (name, address, district, zipCode, number, city) {
        super(name);
        this.address = address;
        this.district = district;
        this.zipCode = zipCode;
        this.number = number;
        this.city = city;
    }
    
    get address() {
        return this.address;
    }

    get district() {
        return this.district;
    }

    get zipCode() {
        return this.zipCode;
    }

    get number() {
        return this.number;
    }

    get city() {
        return this.city;
    }  
}