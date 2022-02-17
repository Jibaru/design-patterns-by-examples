namespace ChainOfResponsabilityExample1 {
  interface ComponentWithContextualHelp {
    showHelp(): void;
  }

  abstract class Component implements ComponentWithContextualHelp {
    protected _container: Container;

    constructor(
      private _x: number,
      private _y: number,
      private _width: number,
      private _height: number,
      private _tooltipText: string = ""
    ) {}

    public showHelp(): void {
      if (this._tooltipText != null) console.log(this._tooltipText);
      else this._container.showHelp();
    }

    public set container(aContainer: Container) {
      this._container = aContainer;
    }

    public set tooltipText(aTooltipText: string) {
      this._tooltipText = aTooltipText;
    }
  }

  abstract class Container extends Component {
    protected _children: Component[] = [];

    public add(child: Component) {
      this._children.push(child);
      child.container = this;
    }
  }

  class Button extends Component {}

  class Panel extends Container {
    private _modalHelpText: string;

    public override showHelp(): void {
      if (this._modalHelpText != null) console.log(this._modalHelpText);
      else super.showHelp();
    }

    public set modalHelpText(aModalHelpText: string) {
      this._modalHelpText = aModalHelpText;
    }
  }

  class Dialog extends Container {
    private _wikiPageURL: string;

    public override showHelp(): void {
      if (this._wikiPageURL != null) console.log(this._wikiPageURL);
      else super.showHelp();
    }

    public set wikiPageURL(aWikiPageURL: string) {
      this._wikiPageURL = aWikiPageURL;
    }
  }

  class Application {
    private _componentPressed: Component;

    public createUI() {
      const dialog = new Dialog(0, 0, 123, 112, "Budget Reports");
      dialog.wikiPageURL = "http://...";
      const panel = new Panel(0, 0, 400, 800);
      panel.modalHelpText = "This panel does...";
      const ok = new Button(250, 760, 50, 20, "OK");
      ok.tooltipText = "This is an OK button that...";
      const cancel = new Button(320, 760, 50, 20, "Cancel");

      // ...

      panel.add(ok);
      panel.add(cancel);
      dialog.add(panel);

      this._componentPressed = cancel;
    }

    // Imagine what happens here.
    public onF1KeyPress() {
      const component = this.getComponentAtMouseCoords();
      component.showHelp();
    }

    private getComponentAtMouseCoords(): Component {
      return this._componentPressed;
    }

    public main(): void {
      this.createUI();
      this.onF1KeyPress();
    }
  }

  new Application().main();
}
