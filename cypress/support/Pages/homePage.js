export class HomePage {
    constructor() {
        this.onlineShopButton = '#onlineshoplink';
    };

    clickInOnlineShop() {
        cy.get(this.onlineShopButton).click();
    };

};