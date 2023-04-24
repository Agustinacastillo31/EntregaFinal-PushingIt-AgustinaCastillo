/// <reference types="cypress" />


import { HomePage } from '../support/Pages/homePage';
import { ProductPage } from '../support/Pages/productPage';
import { ShoppingCartPage } from '../support/Pages/shoppingCartPage';
import { CheckoutPage } from '../support/Pages/checkOutPage';
import { ReceiptPage } from '../support/Pages/receiptPage';




describe('Datos login + test', () => {
    let productsData;
    let checkoutData;

    const homePage = new HomePage();
    const productPage = new ProductPage();
    const shoppingCartPage = new ShoppingCartPage();
    const checkOutPage = new CheckoutPage();
    const receiptPage = new ReceiptPage();

    const username = 'agustina' + Math.floor(Math.random() * 1000);
    const password = "123456!";
    const gender = "Female";
    const day = "31";
    const month = "08";
    const year = "1994";

    before('login', () => {
        cy.fixture('fixtureCheckout').then(data => {
            checkoutData = data;
        });
        cy.fixture("fixtureProducts").then(data => {
            productsData = data;
        });

        cy.request({
            url: 'https://pushing-it.onrender.com/api/register',
            method: 'POST',
            body: {
                username: username,
                password: password,
                gender: gender,
                day: day,
                month: month,
                year: year
            }
        }).then(response => {
            expect(response.status).equal(200);
            expect(response.body.newUser.username).equal(username);
            cy.request({
                url: 'https://pushing-it.onrender.com/api/login',
                method: 'POST',
                body: {
                    username: username,
                    password: password,
                },
            }).then(response => {
                expect(response.status).equal(200);
                localStorage.setItem('user', response.body.user.username);
                localStorage.setItem('token', response.body.token);
            });
        });
    });


    it('test', () => {
        cy.visit('');
        homePage.clickInOnlineShop();
        productPage.addProductToCart(productsData.products.product1.productName);
        productPage.addProductToCart(productsData.products.product2.productName);
        productPage.clickGoToCart();
        shoppingCartPage.getAddedProductPrice(productsData.products.product1.productName).should('have.text', `$${productsData.products.product1.productPrice}`);
        shoppingCartPage.getAddedProductPrice(productsData.products.product2.productName).should('have.text', `$${productsData.products.product2.productPrice}`);
        shoppingCartPage.clickShowTotalPriceButton();
        shoppingCartPage.goToCheckoutButton();
        checkOutPage.typeFirstName(checkoutData.userName);
        checkOutPage.typeLastName(checkoutData.lastName);
        checkOutPage.typecardNumber(checkoutData.cardNumber);
        checkOutPage.clickPurchaseButton();
        receiptPage.getName().should('contain', (`${checkoutData.userName} ${checkoutData.lastName}`));
        receiptPage.getAddedProductName(productsData.products.product1.productName).should('have.text', productsData.products.product1.productName);
        receiptPage.getAddedProductName(productsData.products.product2.productName).should('have.text', productsData.products.product2.productName);
        receiptPage.getCardNumber().should('have.text', checkoutData.cardNumber);
        receiptPage.getTotalPrice().should('have.text', 'You have spent $35');
        receiptPage.getTotalPrice().should("contain",(`$${productsData.products.product1.productPrice + productsData.products.product2.productPrice}`));
    });

    after('user is eliminated', () => {
        cy.request({
            url: `https://pushing-it.onrender.com/api/deleteuser/${username}`,
            method: 'DELETE'
        }).then(response => {
            expect(response.status).equal(200);
        });
    });
});



/*revisar mayusculas minusculas
shift+alt+F para acomodar el codigo */


