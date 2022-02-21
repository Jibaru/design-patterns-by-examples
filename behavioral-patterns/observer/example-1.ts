namespace ObserverExample1 {
  class EventManager {
    private _listeners: Map<string, EventListener[]> = new Map();

    public subscribe(eventType: string, listener: EventListener): void {
      if (!(eventType in this._listeners)) {
        this._listeners[eventType] = [];
      }

      this._listeners[eventType].push(listener);
    }

    public unsubscribe(eventType: string, listener: EventListener): void {
      if (eventType in this._listeners) {
        const index = this._listeners[eventType].findIndex(listener);
        this._listeners[eventType].splice(index, 1);
      }
    }

    public notify(eventType: string, data: string): void {
      for (const listener of this._listeners[eventType]) {
        listener.update(data);
      }
    }
  }

  class File {
    private _name: string;

    constructor(private path: string) {
      const parts = this.path.split("/");
      this._name = parts[parts.length - 1];
    }

    public get name(): string {
      return this._name;
    }

    public write(message: string = ""): void {
      console.log(`File ${this.name} wrote, message: ${message}`);
    }
  }

  class System {
    public static email(email: string, message: string): void {
      console.log(`Sended mail to ${email} with message: ${message}`);
    }
  }

  class Editor {
    public events: EventManager;
    private _file: File;

    constructor() {
      this.events = new EventManager();
    }

    public openFile(path: string): void {
      this._file = new File(path);
      this.events.notify("open", this._file.name);
    }

    public saveFile(): void {
      this._file.write();
      this.events.notify("save", this._file.name);
    }
  }

  interface EventListener {
    update(filename: string): void;
  }

  class LoggingListener implements EventListener {
    private _log: File;
    private _message: string;

    constructor(logFilename: string, message: string) {
      this._log = new File(logFilename);
      this._message = message;
    }

    public update(filename: string): void {
      this._log.write(this._message.replace("%s", filename));
    }
  }

  class EmailAlertsListener implements EventListener {
    constructor(private _email: string, private _message: string) {}

    public update(filename: string): void {
      System.email(this._email, this._message.replace("%s", filename));
    }
  }

  class Application {
    private _editor: Editor;

    public config(): void {
      this._editor = new Editor();

      const logger = new LoggingListener(
        "/path/to/log.txt",
        "Someone has opened the file: %s"
      );
      this._editor.events.subscribe("open", logger);

      const emailAlerts = new EmailAlertsListener(
        "admin@example.com",
        "Someone has changed the file: %s"
      );
      this._editor.events.subscribe("save", emailAlerts);
    }

    public main(): void {
      this._editor.openFile("/path/to/myfile.txt");
      this._editor.saveFile();
    }
  }

  const app = new Application();
  app.config();
  app.main();
}
