namespace DecoratorExample1 {
  type Data = {
    content: string;
  };

  interface DataSource {
    writeData(data: Data): void;
    readData(): Data;
  }

  class FileDataSource implements DataSource {
    constructor(filename) {}

    public writeData(data: Data): void {
      console.log(`Data to write ${data}`);
    }

    public readData(): Data {
      return {
        content: "Hello",
      };
    }
  }

  class DataSourceDecorator implements DataSource {
    constructor(protected _wrappee: DataSource) {}

    public writeData(data: Data): void {
      this._wrappee.writeData(data);
    }

    public readData(): Data {
      return this._wrappee.readData();
    }
  }

  class EncryptionDecorator extends DataSourceDecorator {
    public writeData(data: Data): void {
      let encriptedContent: string = "";

      for (let i = 0; i < data.content.length; i++) {
        let ascii: number = data.content.charCodeAt(i);
        ascii += 13;
        encriptedContent += String.fromCharCode(ascii);
      }

      this._wrappee.writeData({ content: encriptedContent });
    }

    public readData(): Data {
      const data: Data = this._wrappee.readData();

      let decryptedContent: string = "";

      for (let i = 0; i < data.content.length; i++) {
        let ascii: number = data.content.charCodeAt(i);
        ascii -= 13;
        decryptedContent += String.fromCharCode(ascii);
      }

      return {
        content: decryptedContent,
      };
    }
  }

  class CompressionDecorator extends DataSourceDecorator {
    public writeData(data: Data): void {
      const compressedContent = data.content; // compress method executed ...
      this._wrappee.writeData({ content: compressedContent });
    }

    public readData(): Data {
      const uncompressedContent = this._wrappee.readData().content; // uncompress method executed ...
      return {
        content: uncompressedContent,
      };
    }
  }

  class Application {
    private _salaryRecords: Data = {
      content: "1523, 12201, 115",
    };

    public dumbUsageExample(): void {
      let source = new FileDataSource("somefile.dat");
      source.writeData(this._salaryRecords);

      source = new CompressionDecorator(source);
      source.writeData(this._salaryRecords);

      source = new EncryptionDecorator(source);
      source.writeData(this._salaryRecords);
    }
  }

  class SalaryManager {
    private _salaryRecords: Data = {
      content: "1523, 12201, 115",
    };

    constructor(private _source: DataSource) {}

    public load(): Data {
      return this._source.readData();
    }

    public save() {
      this._source.writeData(this._salaryRecords);
    }
  }

  class ApplicationConfigurator {
    private enabledEncryption: boolean = true;
    private enabledCompression: boolean = false;

    public configurationExample() {
      let source = new FileDataSource("salary.dat");
      if (this.enabledEncryption) source = new EncryptionDecorator(source);
      if (this.enabledCompression) source = new CompressionDecorator(source);

      const logger = new SalaryManager(source);
      const salary = logger.load();

      console.log(salary);
    }
  }

  new Application().dumbUsageExample();
  new ApplicationConfigurator().configurationExample();
}
