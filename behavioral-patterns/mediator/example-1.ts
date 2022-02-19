namespace MediatorExample1 {
  interface Mediator {
    notify(sender: Component, event: string): void;
  }

  class Component {
    constructor(protected _dialog: Mediator) {}

    public click(): void {
      this._dialog.notify(this, "click");
    }

    public keypress(): void {
      this._dialog.notify(this, "keypress");
    }
  }

  class Button extends Component {}

  class Textbox extends Component {
    public get text(): string {
      return "a text";
    }
  }

  class Checkbox extends Component {
    private _checked: boolean = false;

    public check(): void {
      this._dialog.notify(this, "check");
    }

    public get checked(): boolean {
      return this._checked;
    }
  }

  class AuthenticationDialog implements Mediator {
    private title: string;
    private loginOrRegisterChkBx: Checkbox;
    private loginUsername: Textbox;
    private loginPassword: Textbox;
    private registrationUsername: Textbox;
    private registrationPassword: Textbox;
    private registrationEmail: Textbox;
    private okBtn: Button;
    private cancelBtn: Button;

    constructor() {
      this.loginOrRegisterChkBx = new Checkbox(this);
      this.loginUsername = new Textbox(this);
      this.loginPassword = new Textbox(this);
      this.registrationUsername = new Textbox(this);
      this.registrationPassword = new Textbox(this);
      this.registrationEmail = new Textbox(this);
      this.okBtn = new Button(this);
      this.cancelBtn = new Button(this);
    }

    public notify(sender: Component, event: string) {
      if (sender === this.loginOrRegisterChkBx && event === "check") {
        if (this.loginOrRegisterChkBx.checked) {
          this.title = "Log in";
          console.log("It's login");
        } else {
          this.title = "Register";
          console.log("It's register");
        }
      }

      if (sender === this.okBtn && event === "click") {
        if (this.loginOrRegisterChkBx.checked) {
          const found = !!this.loginUsername.text && !!this.loginPassword.text;
          if (!found) {
            console.log("Cannot login");
          }
        } else {
          console.log(
            `User created with ${this.registrationEmail.text}, ${this.registrationUsername.text}, ${this.registrationPassword.text}`
          );
        }
      }
    }

    public main(): void {
      this.okBtn.click();
    }
  }

  new AuthenticationDialog().main();
}
