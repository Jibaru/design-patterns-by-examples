namespace CompositeExample1 {
  interface Graphic {
    move(x: number, y: number): void;
    draw(): void;
  }

  class Dot implements Graphic {
    constructor(protected _x: number, protected _y: number) {}

    public move(x: number, y: number): void {
      this._x += x;
      this._y += y;
    }

    public draw(): void {
      console.log(`Drew dot at (${this._x}, ${this._y})`);
    }
  }

  class Circle extends Dot {
    private _radius: number;

    constructor(x: number, y: number, radius: number) {
      super(x, y);
      this._radius = radius;
    }

    public draw(): void {
      console.log(
        `Drew circle at (${this._x}, ${this._y}) with radius ${this._radius}`
      );
    }
  }

  class CompoundGraphic implements Graphic {
    private _children: Graphic[] = [];

    public add(child: Graphic): void {
      this._children.push(child);
    }

    public remove(child: Graphic): void {
      const index = this._children.indexOf(child);
      if (index >= 0) {
        this._children.splice(index, 1);
      }
    }

    public move(x: number, y: number): void {
      for (const child of this._children) {
        child.move(x, y);
      }
    }

    public draw(): void {
      console.log(`Drew a compounent graphic`);
    }
  }

  class ImageEditor {
    private _all: CompoundGraphic;

    public load(): void {
      this._all = new CompoundGraphic();
      this._all.add(new Dot(1, 2));
      this._all.add(new Circle(5, 3, 10));
    }

    public groupSelected(components: Graphic[]): void {
      const group = new CompoundGraphic();

      for (const component of components) {
        group.add(component);
        this._all.remove(component);
      }

      this._all.add(group);
      this._all.draw();
    }
  }

  const imageEditor = new ImageEditor();
  imageEditor.load();
  imageEditor.groupSelected([
    new Dot(1, 4),
    new Circle(4, 5, 30),
    new Dot(3, 3)
  ]);
}
