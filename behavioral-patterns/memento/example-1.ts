namespace MementoExample1 {
  class Editor {
    private _text: string;
    private _curX: number;
    private _curY: number;
    private _selectionWidth: number;

    public setText(text: string): void {
      this._text = text;
    }

    public setCursor(x: number, y: number): void {
      this._curX = x;
      this._curY = y;
    }

    public setSelectionWidth(width: number): void {
      this._selectionWidth = width;
    }

    public createSnapshot(): Snapshot {
      return new Snapshot(
        this,
        this._text,
        this._curX,
        this._curY,
        this._selectionWidth
      );
    }

    public toString(): string {
      return `Editor(text: ${this._text}, x: ${this._curX}, y: ${this._curY}, selectionWidth: ${this._selectionWidth})`;
    }
  }

  class Snapshot {
    constructor(
      private _editor: Editor,
      private _text: string,
      private _curX: number,
      private _curY: number,
      private _selectionWidth: number
    ) {}

    public restore(): void {
      this._editor.setText(this._text);
      this._editor.setCursor(this._curX, this._curY);
      this._editor.setSelectionWidth(this._selectionWidth);
    }
  }

  class Command {
    private _backup: Snapshot;

    constructor(private _editor: Editor) {}

    public makeBackup(): void {
      this._backup = this._editor.createSnapshot();
    }

    public undo(): void {
      if (this._backup != null) this._backup.restore();
    }
  }

  class Application {
    public main(): void {
      const editor = new Editor();
      editor.setCursor(10, 22);
      editor.setText("Hello!");
      editor.setSelectionWidth(6);

      console.log(`Before: ${editor}`);

      const command = new Command(editor);

      command.makeBackup();

      editor.setCursor(90, 11);
      editor.setText("No!");
      editor.setSelectionWidth(3);

      console.log(`After: ${editor}`);

      command.undo();

      console.log(`Restored: ${editor}`);
    }
  }

  new Application().main();
}
