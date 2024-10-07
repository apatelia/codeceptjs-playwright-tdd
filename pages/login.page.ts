const { I } = inject();

class LoginPage {
  readonly usernameTextBox: CodeceptJS.LocatorOrString;
  readonly passwordTextBox: CodeceptJS.LocatorOrString;
  readonly loginButton: CodeceptJS.LocatorOrString;
  readonly errorMessage: CodeceptJS.LocatorOrString;

  constructor() {
    this.usernameTextBox = "#user-name";
    this.passwordTextBox = "#password";
    this.loginButton = "#login-button";
    this.errorMessage = "[data-test=\"error\"]";
  }

  goto(): void {
    I.amOnPage("/");
  }

  doLogin(username: string, password: string): void {
    I.fillField(this.usernameTextBox, username);
    I.fillField(this.passwordTextBox, password);
    I.click(this.loginButton);
  }

  loginAsAStandardUser(): void {
    this.doLogin("standard_user", "secret_sauce");
  }
}

module.exports = new LoginPage();
module.exports.LoginPage = LoginPage;
