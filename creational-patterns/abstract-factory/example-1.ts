namespace AbstractFactoryExample1 {
  abstract class Chair {
    constructor(protected _numberOfLegs: number) {}

    public abstract hasLegs(): boolean;
    public abstract sitOn(): void;
  }

  class VictorianChair extends Chair {
    constructor(numberOfLegs: number) {
      super(numberOfLegs);
    }

    public hasLegs(): boolean {
      return this._numberOfLegs > 0;
    }

    public sitOn(): void {
      console.log("Sat on VictorianChair");
    }
  }

  class ModernChair extends Chair {
    constructor(numberOfLegs: number) {
      super(numberOfLegs);
    }

    public hasLegs(): boolean {
      return this._numberOfLegs > 0;
    }

    public sitOn(): void {
      console.log("Sat on ModernChair");
    }
  }

  class ArtDecoChair extends Chair {
    constructor(numberOfLegs: number) {
      super(numberOfLegs);
    }

    public hasLegs(): boolean {
      return this._numberOfLegs > 0;
    }

    public sitOn(): void {
      console.log("Sat on ArtDecoChair");
    }
  }

  abstract class CoffeeTable {
    public abstract stand(): void;
  }

  class VictorianCoffeeTable extends CoffeeTable {
    public stand(): void {
      console.log("Standed on VictorianCoffeeTable");
    }
  }

  class ModernCoffeeTable extends CoffeeTable {
    public stand(): void {
      console.log("Standed on ModernCoffeeTable");
    }
  }

  class ArtDecoCoffeeTable extends CoffeeTable {
    public stand(): void {
      console.log("Standed on ArtDecoCoffeeTable");
    }
  }

  abstract class Sofa {
    public abstract sitOn(): void;
  }

  class VictorianSofa extends Sofa {
    public sitOn(): void {
      console.log("Sat on on VictorianSofa");
    }
  }

  class ModernSofa extends Sofa {
    public sitOn(): void {
      console.log("Sat on ModernSofa");
    }
  }

  class ArtDecoSofa extends Sofa {
    public sitOn(): void {
      console.log("Sat on ArtDecoSofa");
    }
  }

  interface FurnitureFactory {
    createChair(): Chair;
    createCoffeeTable(): CoffeeTable;
    createSofa(): Sofa;
  }

  class VictorianFurnitureFactory implements FurnitureFactory {
    createChair(): Chair {
      return new VictorianChair(4);
    }

    createCoffeeTable(): CoffeeTable {
      return new VictorianCoffeeTable();
    }

    createSofa(): Sofa {
      return new VictorianSofa();
    }
  }

  class ModernFurnitureFactory implements FurnitureFactory {
    createChair(): Chair {
      return new ModernChair(0);
    }

    createCoffeeTable(): CoffeeTable {
      return new ModernCoffeeTable();
    }

    createSofa(): Sofa {
      return new ModernSofa();
    }
  }

  class ArtDecoFurnitureFactory implements FurnitureFactory {
    createChair(): Chair {
      return new ArtDecoChair(3);
    }

    createCoffeeTable(): CoffeeTable {
      return new ArtDecoCoffeeTable();
    }

    createSofa(): Sofa {
      return new ArtDecoSofa();
    }
  }

  class Application {
    private _chair: Chair;
    private _coffeeTable: CoffeeTable;
    private _sofa: Sofa;

    constructor(private _factory: FurnitureFactory) {}

    public createUI(): void {
      this._chair = this._factory.createChair();
      this._coffeeTable = this._factory.createCoffeeTable();
      this._sofa = this._factory.createSofa();
    }

    public paint(): void {
      this._chair.sitOn();
      this._coffeeTable.stand();
      this._sofa.sitOn();
    }
  }

  class Configuration {
    constructor(readonly type: string) {}
  }

  class ApplicationConfigurator {
    public main(): void {
      const config: Configuration = this._readApplicationConfigFile();

      const factory: FurnitureFactory = (() => {
        if (config.type === "Victorian") return new VictorianFurnitureFactory();
        else if (config.type === "Modern") return new ModernFurnitureFactory();
        else if (config.type === "ArtDeco")
          return new ArtDecoFurnitureFactory();
        else throw new Error("Error! Unknown type");
      })();

      const app: Application = new Application(factory);
      app.createUI();
      app.paint();
    }

    private _readApplicationConfigFile(): Configuration {
      const randomNumber = Math.random();

      if (randomNumber >= 0.4) return new Configuration("Victorian");
      else if (randomNumber >= 0.2) return new Configuration("Modern");
      return new Configuration("ArtDeco");
    }
  }

  new ApplicationConfigurator().main();
}
