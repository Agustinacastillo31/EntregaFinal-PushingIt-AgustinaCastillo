export class ProductPage {

    constructor() {
        this.closeModal = "#closeModal",
            this.goToCart = "#goShoppingCart"
    };

    addProductToCart(product) {
        cy.get(`[value="${product}"]`).click();
        cy.get(this.closeModal).click();
    };

    clickGoToCart() {
        cy.get(this.goToCart).click();
    };
}