namespace PrototypeExample1 {
  abstract class Shape {
    x: number;
    y: number;
    color: string;

    public constructor(source?: Shape) {
      if (source) {
        this.x = source.x;
        this.y = source.y;
        this.color = source.color;
      }
    }

    public abstract clone(): Shape;
  }

  class Rectangle extends Shape {
    width: number;
    height: number;

    public constructor(source?: Rectangle) {
      super(source);
      if (source) {
        this.width = source.width;
        this.height = source.height;
      }
    }

    public clone(): Shape {
      return new Rectangle(this);
    }
  }

  class Circle extends Shape {
    radius: number;

    constructor(source?: Circle) {
      super(source);
      if (source) {
        this.radius = source.radius;
      }
    }

    public clone(): Shape {
      return new Circle(this);
    }
  }

  class Application {
    shapes: Shape[] = [];

    constructor() {
      const circle: Circle = new Circle();
      circle.x = 10;
      circle.y = 10;
      circle.radius = 20;
      circle.color = "Red";
      this.shapes.push(circle);

      const anotherCircle: Shape = circle.clone();
      this.shapes.push(anotherCircle);

      const rectangle: Rectangle = new Rectangle();
      rectangle.width = 10;
      rectangle.height = 20;
      rectangle.x = 30;
      rectangle.y = 40;
      rectangle.color = "Green";
      this.shapes.push(rectangle);
    }

    public businessLogic(): void {
      const shapesCopy: Shape[] = [];

      for (const s of this.shapes) {
        shapesCopy.push(s.clone());
      }

      console.log(shapesCopy);
    }
  }

  new Application().businessLogic();
}
