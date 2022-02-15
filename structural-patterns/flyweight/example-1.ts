namespace FlyweightExample1 {
  class Canvas {
    public draw(x: number, y: number) {
      console.log(`Object drew at (${x}, ${y})`);
    }
  }

  class TreeType {
    constructor(
      private _name: string,
      private _color: string,
      private _texture: string
    ) {}

    public draw(canvas: Canvas, x: number, y: number): void {
      canvas.draw(x, y);
      console.log(`TreeType: ${this.name}, ${this.color}, ${this.texture}`);
    }

    get name(): string {
      return this._name;
    }

    get color(): string {
      return this._color;
    }

    get texture(): string {
      return this._texture;
    }
  }

  class TreeFactory {
    private static _treeTypes: TreeType[] = [];

    public static getTreeType(name: string, color: string, texture: string) {
      let type = TreeFactory._treeTypes.find(
        (treeType) =>
          treeType.name === name &&
          treeType.color === color &&
          treeType.texture === texture
      );
      if (type == null) {
        type = new TreeType(name, color, texture);
        TreeFactory._treeTypes.push(type);
      }

      return type;
    }

    static get treeTypesSize(): number {
      return TreeFactory._treeTypes.length;
    }
  }

  class Tree {
    constructor(
      private _x: number,
      private _y: number,
      private _type: TreeType
    ) {}

    public draw(canvas: Canvas): void {
      this._type.draw(canvas, this._x, this._y);
    }
  }

  class Forest {
    private _trees: Tree[] = [];

    public plantTree(
      x: number,
      y: number,
      name: string,
      color: string,
      texture: string
    ): void {
      const type = TreeFactory.getTreeType(name, color, texture);
      const tree = new Tree(x, y, type);
      this._trees.push(tree);
    }

    public draw(canvas: Canvas): void {
      for (const tree of this._trees) {
        tree.draw(canvas);
      }
    }
  }

  class Application {
    public main(): void {
      const forest = new Forest();

      forest.plantTree(1, 3, "A", "red", "texture1.png");
      forest.plantTree(2, 3, "B", "blue", "texture2.png");
      forest.plantTree(5, 4, "A", "red", "texture1.png");
      forest.plantTree(8, 1, "B", "blue", "texture2.png");

      forest.draw(new Canvas());

      console.log(`Total of TreeTypes: ${TreeFactory.treeTypesSize}`);
    }
  }

  new Application().main();
}
