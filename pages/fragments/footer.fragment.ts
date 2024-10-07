const { I } = inject();

class Footer {
  private readonly twitterLink: CodeceptJS.LocatorOrString;
  private readonly facebookLink: CodeceptJS.LocatorOrString;
  private readonly linkedInLink: CodeceptJS.LocatorOrString;
  private readonly copyrightText: CodeceptJS.LocatorOrString;

  constructor() {
    this.twitterLink = "a[data-test='social-twitter']";
    this.facebookLink = "a[data-test='social-facebook']";
    this.linkedInLink = "a[data-test='social-linkedin']";
    this.copyrightText = "div.footer_copy";
  }

  clickTwitterLink(): void {
    I.click(this.twitterLink);
  }

  clickFacebookLink(): void {
    I.click(this.facebookLink);
  }

  clickLinkedInLink(): void {
    I.click(this.linkedInLink);
  }
}

module.exports = new Footer();
module.exports.Footer = Footer;
