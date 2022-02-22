namespace VisitorExample1 {
  interface Shape {
    move(x: number, y: number): void;
    draw(): void;
    accept(v: Visitor): void;
  }

  class Dot implements Shape {
    public move(x: number, y: number): void {
      console.log(`Moved dot at position (${x}, ${y})`);
    }

    public draw(): void {
      console.log("Drew dot");
    }

    public accept(v: Visitor): void {
      v.visitDot(this);
    }

    public toString(): string {
      return "Dot";
    }
  }

  class Circle implements Shape {
    public move(x: number, y: number): void {
      console.log(`Moved circle at position (${x}, ${y})`);
    }

    public draw(): void {
      console.log("Drew circle");
    }

    public accept(v: Visitor): void {
      v.visitCircle(this);
    }

    public toString(): string {
      return "Circle";
    }
  }

  class Rectangle implements Shape {
    public move(x: number, y: number): void {
      console.log(`Moved rectangle at position (${x}, ${y})`);
    }

    public draw(): void {
      console.log("Drew rectangle");
    }

    public accept(v: Visitor): void {
      v.visitRectangle(this);
    }

    public toString(): string {
      return "Rectangle";
    }
  }

  class CompoundShape implements Shape {
    public move(x: number, y: number): void {
      console.log(`Moved compound shape at position (${x}, ${y})`);
    }

    public draw(): void {
      console.log("Drew compound shape");
    }

    public accept(v: Visitor): void {
      v.visitCompoundShape(this);
    }

    public toString(): string {
      return "CompoundShape";
    }
  }

  interface Visitor {
    visitDot(d: Dot): void;
    visitCircle(c: Circle): void;
    visitRectangle(r: Rectangle): void;
    visitCompoundShape(cs: CompoundShape): void;
  }

  class XMLExportVisitor implements Visitor {
    public visitDot(d: Dot): void {
      d.move(0, 0);
      console.log(`XML: ${d}`);
    }

    public visitCircle(c: Circle): void {
      c.move(0, 0);
      console.log(`XML: ${c}`);
    }

    public visitRectangle(r: Rectangle): void {
      r.move(0, 0);
      console.log(`XML: ${r}`);
    }

    public visitCompoundShape(cs: CompoundShape): void {
      cs.move(0, 0);
      console.log(`XML: ${cs}`);
    }
  }

  class Application {
    private _allShapes: Shape[];

    constructor() {
      this._allShapes = [...new Array(10)].map(() => {
        const random = Math.random();

        if (random >= 0.7) return new Dot();
        if (random >= 0.4) return new Circle();
        if (random >= 0.2) return new Rectangle();

        return new CompoundShape();
      });
    }

    public export(): void {
      const exportVisitor = new XMLExportVisitor();

      for (const shape of this._allShapes) {
        shape.accept(exportVisitor);
      }
    }
  }

  new Application().export();
}
