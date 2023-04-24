export class ShoppingCartPage {

    constructor() {
        this.showTtotalPriceButton = "Show total price",
            this.price = "#price"
        this.checkoutButton = "Go to Checkout"
    };

    getAddedProductPrice(product) {
        return cy.xpath(`//p[text() = '${product}']//following-sibling::p[@id= "productPrice"]`);
    };

    clickShowTotalPriceButton() {
        cy.contains(this.showTtotalPriceButton).click();
    };

    goToCheckoutButton() {
        cy.contains(this.checkoutButton).click();
    }
}