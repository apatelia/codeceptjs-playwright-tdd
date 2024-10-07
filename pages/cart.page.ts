const { I } = inject();

class CartPage {
  readonly cartHeading: CodeceptJS.LocatorOrString;
  readonly allProductsInCart: CodeceptJS.LocatorOrString;
  readonly continueShoppingButton: CodeceptJS.LocatorOrString;
  readonly checkoutButton: CodeceptJS.LocatorOrString;

  constructor() {
    this.cartHeading = "span[data-test='title']";
    this.allProductsInCart = "div.cart_item";
    this.continueShoppingButton = "button#continue-shopping";
    this.checkoutButton = "button#checkout";
  }

  private findProductByName(productName: string): CodeceptJS.Locator {
    return locate("div.cart_item").withDescendant("div.inventory_item_name ").withText(productName);
  }

  removeProductFromCart(productName: string): void {
    const product = this.findProductByName(productName);

    const removeButton = product.find("button");
    I.click(removeButton);
  }

  async getProductPrice(productName: string): Promise<string> {
    const product = this.findProductByName(productName);
    const productPrice = await I.grabTextFrom(product.find("div.inventory_item_price"));

    return `${productPrice}`;
  }

  async getProductQuantity(productName: string): Promise<number> {
    const product = locate("div.cart_item").withDescendant("div.inventory_item_name").withText(productName);
    const quantity = await I.grabTextFrom(product.find("div.cart_quantity"));

    return quantity === "" ? 0 : +quantity;
  }
}

module.exports = new CartPage();
module.exports.CartPage = CartPage;
