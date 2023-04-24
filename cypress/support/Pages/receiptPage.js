const constant = require('./constant');

export class ReceiptPage {
    constructor() {
        this.name = "#name",
            this.cardNumber = "#creditCard",
            this.totalPrice = "#totalPrice";
    };

    getName() {
        return cy.get(this.name, { timeout: constant.TIMEOUT * 1.3 });
    };

    getAddedProductName(product) {
        return cy.xpath(`//p[text() = '${product}']`);
    };

    getCardNumber() {
        return cy.get(this.cardNumber);
    };

    getTotalPrice() {
        return cy.get(this.totalPrice);
    }
} 