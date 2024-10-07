Feature("Products");

import Products from "./test-data/product-data.json";
import Links from "./test-data/footer-links.json";
const footerLinks = new DataTable([ "name", "url" ]);

Links.links.forEach((link: { name: string; url: string; }) => {
  footerLinks.add([ link.name, link.url ]);
});

Before(({ I, loginPage }) => {
  loginPage.goto();
  loginPage.loginAsAStandardUser();
  I.seeInCurrentUrl("inventory.html");
});

Scenario("Test that I am able to add a product to the cart", async ({ I, productsPage, header }) => {
  productsPage.addProductToCart(Products.Backpack);
  I.seeTextEquals("1", header.cartItemCount);
}).tag("@products").tag("@add_to_cart");

Scenario("Test that I am able to remove a product from the cart", async ({ I, productsPage, header }) => {
  productsPage.addProductToCart(Products.BikeLight);
  I.seeTextEquals("1", header.cartItemCount);

  productsPage.removeProductFromCart(Products.BikeLight);
  I.dontSee(header.cartItemCount);
}).tag("@products").tag("@remove_from_cart");

Scenario("Test that I am able to log out from the products page", async ({ I, loginPage, header }) => {
  header.doLogout();
  I.seeElement(loginPage.loginButton);
}).tag("@logout");

Data(footerLinks).Scenario("Test Social Media links in footer @footer", ({ I, current, footer }) => {
  switch (current.name) {
    case "Twitter/X":
      I.seeElement(footer.twitterLink);
      footer.clickTwitterLink();
      break;
    case "Facebook":
      I.seeElement(footer.facebookLink);
      footer.clickFacebookLink();
      break;
    case "LinkedIn":
      I.seeElement(footer.linkedInLink);
      footer.clickLinkedInLink();
      break;
    default:
      break;
  }

  I.waitForNumberOfTabs(2, 5);
  I.switchToNextTab();
  I.seeInCurrentUrl(current.url);
}).tag("@products").tag("@footer");
