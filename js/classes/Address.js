class Address {
    constructor (address, district, zipCode, number, city) {
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