/// <reference types='codeceptjs' />

type steps_file = typeof import("./steps_file");
type ChaiWrapper = import("codeceptjs-chai");
type loginPage = typeof import("./pages/login.page");
type productsPage = typeof import("./pages/products.page");
type cartPage = typeof import("./pages/cart.page");
type header = typeof import("./pages/fragments/header.fragment");
type footer = typeof import("./pages/fragments/footer.fragment");

declare namespace CodeceptJS {
  interface SupportObject {
    I: I,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    current: any,
    loginPage: LoginPage,
    productsPage: ProductsPage,
    cartPage: CartPage,
    header: Header,
    footer: Footer,
  }

  interface Methods extends Playwright, ChaiWrapper, Mochawesome { }

  interface I extends ReturnType<steps_file>, WithTranslation<Methods> { }

  namespace Translation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Actions { }
  }
}
