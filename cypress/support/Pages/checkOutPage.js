export class CheckoutPage {

    constructor() {
        this.firstNameInput = '#FirstName';
        this.lastNameInput = '#lastName';
        this.cardNumberInput = '#cardNumber';
        this.purchaseButton = "Purchase";
    };

    typeFirstName(name) {
        cy.get(this.firstNameInput).type(name);
    };

    typeLastName(lastName) {
        cy.get(this.lastNameInput).type(lastName);
    };

    typecardNumber(cardNumber) {
        cy.get(this.cardNumberInput).type(cardNumber);
    };

    clickPurchaseButton() {
        cy.contains(this.purchaseButton).click();
    };
};