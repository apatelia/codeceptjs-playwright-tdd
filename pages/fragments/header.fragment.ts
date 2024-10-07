const { I } = inject();

class Header {
  readonly hamburgerMenuButton: CodeceptJS.LocatorOrString;
  readonly logoutMenuEntry: CodeceptJS.LocatorOrString;
  readonly hamburgerMenuCloseButton: CodeceptJS.LocatorOrString;
  readonly cartLink: CodeceptJS.LocatorOrString;
  readonly cartItemCount: CodeceptJS.LocatorOrString;

  constructor() {
    this.hamburgerMenuButton = "button#react-burger-menu-btn";
    this.logoutMenuEntry = "a#logout_sidebar_link";
    this.hamburgerMenuCloseButton = "button#react-burger-cross-btn";
    this.cartLink = "a.shopping_cart_link";
    this.cartItemCount = "span.shopping_cart_badge";
  }

  doLogout(): void {
    I.click(this.hamburgerMenuButton);
    I.click(this.logoutMenuEntry);
  }

  closeMenu(): void {
    I.click(this.hamburgerMenuCloseButton);
  }

  goToCart(): void {
    I.click(this.cartLink);
  }
}

module.exports = new Header();
module.exports.Header = Header;
