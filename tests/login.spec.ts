Feature("Login");

import LoginData from "./test-data/login-data.json";
const validCredentials = new DataTable([ "userName", "password" ]);
const invalidCredentials = new DataTable([ "userName", "password" ]);

LoginData.validCredentials.forEach((credential: { userName: string; password: string; }) => {
  validCredentials.add([ credential.userName, credential.password ]);
});

LoginData.invalidCredentials.forEach((credential: { userName: string; password: string; }) => {
  invalidCredentials.add([ credential.userName, credential.password ]);
});

Data(validCredentials).Scenario("I am able to login using valid credentials", async ({ I, loginPage, current }) => {
  loginPage.goto();
  loginPage.doLogin(current.userName, current.password);
  I.seeInCurrentUrl("inventory.html");
});

Data(invalidCredentials).Scenario("I am not able to login using invalid credentials", async ({ I, loginPage, current }) => {
  loginPage.goto();
  loginPage.doLogin(current.userName, current.password);
  I.seeElement(loginPage.errorMessage);
  I.seeTextEquals("Epic sadface: Username and password do not match any user in this service", loginPage.errorMessage);
});

Scenario("I, a locked out user, is not able to login despite using valid credentials", async ({ I, loginPage }) => {
  loginPage.goto();
  loginPage.doLogin("locked_out_user", "secret_sauce");
  I.seeElement(loginPage.errorMessage);
  I.seeTextEquals("Epic sadface: Sorry, this user has been locked out.", loginPage.errorMessage);
});
