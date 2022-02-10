namespace FactoryMethodExample1 {
  interface Button {
    render(): void;
    onClick(f: Function): void;
  }

  class WindowsButton implements Button {
    public render(): void {
      console.log("WindowButton rendered");
    }

    public onClick(f: Function): void {
      Function.call(f);
    }
  }

  class HTMLButton implements Button {
    public render(): void {
      console.log("HTMLButton rendered");
    }

    public onClick(f: Function): void {
      Function.call(f);
    }
  }

  abstract class Dialog {
    public abstract createButton(): Button;

    public render(): void {
      const okButton: Button = this.createButton();
      okButton.onClick(this.closeDialog);
      okButton.render();
    }

    public closeDialog(): void {
      console.log("Dialog closed");
    }
  }

  class WindowsDialog extends Dialog {
    public createButton(): Button {
      return new WindowsButton();
    }
  }

  class HTMLDialog extends Dialog {
    public createButton(): Button {
      return new HTMLButton();
    }
  }

  class Configuration {
    constructor(readonly OS: string) {}
  }

  class Application {
    private _dialog: Dialog;

    public initialize(): void {
      const config: Configuration = this._readApplicationConfigFile();

      if (config.OS === "Windows") this._dialog = new WindowsDialog();
      else if (config.OS === "Web") this._dialog = new HTMLDialog();
      else throw new Error("Error! Unknown operating system");
    }

    private _readApplicationConfigFile(): Configuration {
      const os: string = Math.random() >= 0.5 ? "Windows" : "Web";
      return new Configuration(os);
    }

    public main() {
      this.initialize();
      this._dialog.render();
    }
  }

  new Application().main();
}
