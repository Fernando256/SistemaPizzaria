import { Person } from './person.js';

export class Client extends Person{
    constructor (name, address, district, zipCode, number, city, total, cashBack, order) {
        super(name);
        this.address = address;
        this.district = district;
        this.zipCode = zipCode;
        this.number = number;
        this.city = city;
        this.total = total;
        this.cashBack = cashBack;
        this.order = order;
    } 
}