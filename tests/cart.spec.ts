Feature("Cart");

import Products from "./test-data/product-data.json";

Before(({ I, loginPage, productsPage, header }) => {
  loginPage.goto();
  loginPage.loginAsAStandardUser();

  I.seeInCurrentUrl("inventory.html");
  productsPage.addProductToCart(Products.Backpack);

  header.goToCart();
});

Scenario("Test that the correct product is added to the cart", async ({ I, cartPage }) => {
  const quantityInCart = await cartPage.getProductQuantity(Products.Backpack);
  I.assertEqual(quantityInCart, 1);

  const priceInCart = await cartPage.getProductPrice(Products.Backpack);
  I.assertEqual(priceInCart, Products.Backpack_Price);
}).tag("@cart").tag("@verify_product_details");

Scenario("Test removal of a product from the cart", async ({ I, cartPage, header }) => {
  cartPage.removeProductFromCart(Products.Backpack);
  I.dontSee(header.cartItemCount);
}).tag("@cart").tag("@remove_from_cart");

Scenario("Test that clicking on 'Continue Shopping' button takes back to Products page", async ({ I, cartPage }) => {
  I.click(cartPage.continueShoppingButton);
  I.seeInCurrentUrl("inventory.html");
}).tag("@cart").tag("@continue_shopping");

Scenario("Test that clicking on 'Checkout' button starts checkout", async ({ I, cartPage }) => {
  I.click(cartPage.checkoutButton);
  I.seeInCurrentUrl("checkout-step-one.html");
}).tag("@cart").tag("@begin_checkout");

Scenario("Test that the user is able to log out from the cart page", async ({ I, loginPage, header }) => {
  header.doLogout();
  I.seeElement(loginPage.loginButton);
}).tag("@logout");

Scenario("Test that the copyright text in footer is visible and is correct", async ({ I, footer }) => {
  I.seeElement(footer.copyrightText);

  const currentYear = new Date().getFullYear();
  const expectedText = `© ${currentYear} Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy`;

  I.seeTextEquals(expectedText, footer.copyrightText);
}).tag("@footer").tag("@copyright");
