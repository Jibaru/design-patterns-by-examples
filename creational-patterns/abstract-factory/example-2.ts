namespace AbstractFactoryExample2 {
  abstract class Button {
    public abstract paint(): void;
  }

  class WinButton extends Button {
    public paint(): void {
      console.log("WinButton painted");
    }
  }

  class MacButton extends Button {
    public paint(): void {
      console.log("MacButton painted");
    }
  }

  abstract class Checkbox {
    public abstract paint(): void;
  }

  class WinCheckbox extends Checkbox {
    public paint(): void {
      console.log("WinCheckbox painted");
    }
  }

  class MacCheckbox extends Checkbox {
    public paint(): void {
      console.log("MacCheckbox painted");
    }
  }

  interface GUIFactory {
    createButton(): Button;
    createCheckbox(): Checkbox;
  }

  class WinFactory implements GUIFactory {
    public createButton(): Button {
      return new WinButton();
    }

    public createCheckbox(): Checkbox {
      return new WinCheckbox();
    }
  }

  class MacFactory implements GUIFactory {
    public createButton(): Button {
      return new MacButton();
    }

    public createCheckbox(): Checkbox {
      return new MacCheckbox();
    }
  }

  class Application {
    private _button: Button;
    private _checkbox: Checkbox;

    constructor(private _factory: GUIFactory) {}

    public createUI(): void {
      this._button = this._factory.createButton();
      this._checkbox = this._factory.createCheckbox();
    }

    public paint(): void {
      this._button.paint();
      this._checkbox.paint();
    }
  }

  class Configuration {
    constructor(readonly OS: string) {}
  }

  class ApplicationConfigurator {
    public main(): void {
      const config: Configuration = this._readApplicationConfigFile();

      const factory: GUIFactory = (() => {
        if (config.OS === "Windows") return new WinFactory();
        else if (config.OS === "Mac") return new MacFactory();
        else throw new Error("Error! Unknown operating system.");
      })();

      const app: Application = new Application(factory);
      app.createUI();
      app.paint();
    }

    private _readApplicationConfigFile(): Configuration {
      const randomNumber = Math.random();

      if (randomNumber >= 0.5) return new Configuration("Windows");
      return new Configuration("Mac");
    }
  }

  new ApplicationConfigurator().main();
}
