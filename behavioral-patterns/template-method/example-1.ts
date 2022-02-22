namespace TemplateMethodExample1 {
  class Position {
    constructor(private _x: number, private _y: number) {}

    public get x(): number {
      return this._x;
    }
    public get y(): number {
      return this._y;
    }

    public toString(): string {
        return `Position(x: ${this._x}, y: ${this._y})`;
    }
  }

  class Enemy {
    constructor(private _position: Position) {}

    public get position(): Position {
      return this._position;
    }
  }

  class Structure {
    public collect(): void {
      console.log(`Collected!`);
    }
  }

  class Map {
    constructor(private _center: Position) {}

    public get center(): Position {
      return this._center;
    }
  }

  class Scout {}

  class Warrior {}

  abstract class GameAI {
    protected scouts: Scout[];
    protected warriors: Warrior[];
    protected builtStructures: Structure[];
    protected map: Map;

    constructor() {
      this.scouts = [...new Array(10)].map(() => new Scout());
      this.warriors = [...new Array(10)].map(() => new Warrior());
      this.builtStructures = [...new Array(10)].map(() => new Structure());
      this.map = new Map(new Position(4, 11));
    }

    public turn(): void {
      this.collectResources();
      this.buildStructures();
      this.buildUnits();
      this.attack();
    }

    public collectResources(): void {
      for (const s of this.builtStructures) {
        s.collect();
      }
    }

    public abstract buildStructures(): void;
    public abstract buildUnits(): void;

    public attack(): void {
      const enemy = this.closestEnemy();
      if (enemy == null) this.sendScouts(this.map.center);
      else this.sendWarriors(enemy.position);
    }

    public abstract sendScouts(position: Position): void;
    public abstract sendWarriors(position: Position): void;

    protected closestEnemy(): Enemy {
      return Math.random() > 0.5 ? new Enemy(new Position(11, 3)) : null;
    }
  }

  class OrcsAI extends GameAI {
    constructor() {
      super();
    }

    public buildStructures(): void {
      if (this.builtStructures) {
        console.log("Building structures");
      }
    }

    public buildUnits(): void {
      if (this.builtStructures) {
        if (!this.scouts) this.scouts.push(new Scout());
        else this.warriors.push(new Warrior());
      }
    }

    public sendScouts(position: Position): void {
      if (this.scouts.length > 0) {
        console.log(`Sended scouts to position ${position}`);
      }
    }

    public sendWarriors(position: Position): void {
      if (this.warriors.length > 0) {
        console.log(`Sended warriors to position ${position}`);
      }
    }
  }

  class MonstersAI extends GameAI {
    constructor() {
      super();
    }

    public collectResources(): void {}

    public buildStructures(): void {}

    public buildUnits(): void {}

    public sendScouts(position: Position): void {}

    public sendWarriors(position: Position): void {}
  }

  class Application {
    public main(): void {
      new OrcsAI().turn();
      new MonstersAI().turn();
    }
  }

  new Application().main();
}
