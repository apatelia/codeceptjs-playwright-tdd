const { I } = inject();

class ProductsPage {
  private findProductByName(productName: string): CodeceptJS.Locator {
    return locate("div.inventory_item").withDescendant("div.inventory_item_name ").withText(productName);
  }

  addProductToCart(productName: string): void {
    const product = this.findProductByName(productName);

    const addToCartButton = product.find("button");
    I.click(addToCartButton);
  }

  removeProductFromCart(productName: string): void {
    const product = this.findProductByName(productName);

    const removeButton = product.find("button");
    I.click(removeButton);
  }
}

module.exports = new ProductsPage();
module.exports.ProductsPage = ProductsPage;
