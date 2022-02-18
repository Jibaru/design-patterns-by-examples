namespace CommandExample1 {
  abstract class Command {
    protected _backup: string;

    constructor(protected _app: Application, protected _editor: Editor) {}

    public saveBackup(): void {
      this._backup = this._editor.text;
    }

    public undo(): void {
      this._editor.text = this._backup;
    }

    abstract execute(): boolean;
  }

  class CopyCommand extends Command {
    public execute(): boolean {
      this._app.clipboard = this._editor.getSelection();
      return false;
    }
  }

  class CutCommand extends Command {
    public execute(): boolean {
      this.saveBackup();
      this._app.clipboard = this._editor.getSelection();
      this._editor.deleteSelection();
      return true;
    }
  }

  class PasteCommand extends Command {
    public execute(): boolean {
      this.saveBackup();
      this._editor.replaceSelection(this._app.clipboard);
      return true;
    }
  }

  class UndoCommand extends Command {
    public execute(): boolean {
      this._app.undo();
      return false;
    }
  }

  class CommandHistory {
    private _history: Command[] = [];

    public push(c: Command): void {
      this._history.push(c);
    }

    public pop(): Command {
      return this._history.pop();
    }
  }

  class Editor {
    private _text: string;

    public getSelection(): string {
      return this._text;
    }

    public deleteSelection(): void {
      this._text = null;
    }

    public replaceSelection(text: string): void {
      this._text = text;
    }

    public get text(): string {
      return this._text;
    }

    public set text(text: string) {
      this._text = text;
    }
  }

  class Button {
    private _command: Function;
    public set command(c: Function) {
      this._command = c;
    }

    public click() {
      console.log(`Executed ${this._command} command`);
      this._command();
    }
  }

  class Shortcut {
    private _action: Map<string, Function> = new Map();

    public onKeyPress(combination: string, action: Function) {
      this._action[combination] = action;
    }

    public execute(combination) {
      if (this._action.has(combination)) {
        console.log(`Executed ${combination} combination command`);
        this._action[combination]();
      }
    }
  }

  class Application {
    private _clipboard: string;
    private _editors: Editor[] = [];
    private _activeEditor: Editor = new Editor();
    private _history: CommandHistory = new CommandHistory();

    public get clipboard(): string {
      return this._clipboard;
    }

    public set clipboard(clipboard: string) {
      this._clipboard = clipboard;
    }

    public createUI() {
      const copyButton = new Button();
      const cutButton = new Button();
      const pasteButton = new Button();
      const undoButton = new Button();
      const shortcuts = new Shortcut();

      const copy = () => {
        this.executeCommand(new CopyCommand(this, this._activeEditor));
      };
      copyButton.command = copy;
      shortcuts.onKeyPress("Ctrl+C", copy);

      const cut = () => {
        this.executeCommand(new CutCommand(this, this._activeEditor));
      };
      cutButton.command = copy;
      shortcuts.onKeyPress("Ctrl+X", cut);

      const paste = () => {
        this.executeCommand(new PasteCommand(this, this._activeEditor));
      };
      pasteButton.command = copy;
      shortcuts.onKeyPress("Ctrl+V", paste);

      const undo = () => {
        this.executeCommand(new UndoCommand(this, this._activeEditor));
      };
      undoButton.command = copy;
      shortcuts.onKeyPress("Ctrl+Z", undo);

      // ..
      cutButton.click();
      pasteButton.click();
      shortcuts.execute("Ctrl+Z");
    }

    private executeCommand(command: Command): void {
      if (command.execute()) this._history.push(command);
    }

    public undo(): void {
      const command = this._history.pop();
      if (command != null) command.undo();
    }
  }

  new Application().createUI();
}
