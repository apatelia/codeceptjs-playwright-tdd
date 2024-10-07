import { setHeadlessWhen, setCommonPlugins } from "@codeceptjs/configure";
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: "./tests/**.spec.ts",
  output: "./output",
  helpers: {
    Playwright: {
      browser: "chromium",
      url: "https://www.saucedemo.com",
      trace: true,
    },
    ChaiWrapper: {
      require: "codeceptjs-chai",
    },
  },
  include: {
    I: "./steps_file",
    loginPage: "./pages/login.page.ts",
    productsPage: "./pages/products.page.ts",
    cartPage: "./pages/cart.page.ts",
    header: "./pages/fragments/header.fragment.ts",
    footer: "./pages/fragments/footer.fragment.ts",
  },
  "mocha": {
    "reporterOptions": {
      "codeceptjs-cli-reporter": {
        "stdout": "-",
        "options": {
          "steps": true,
        },
      },
      "mochawesome": {
        "stdout": "-",
        "options": {
          "reportDir": "report",
          "json": false,
        },
      },
    },
  },
  name: "codeceptjs-playwright-tdd",
};
