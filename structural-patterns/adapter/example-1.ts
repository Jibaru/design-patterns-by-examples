namespace AdapterExample1 {
  class RoundHole {
    constructor(private _radius: number) {}

    get radius(): number {
      return this._radius;
    }

    public fits(peg: RoundPeg): boolean {
      return this.radius >= peg.radius;
    }
  }

  class RoundPeg {
    constructor(private _radius: number) {}

    get radius(): number {
      return this._radius;
    }
  }

  class SquarePeg {
    constructor(private _width: number) {}

    get width(): number {
      return this._width;
    }
  }

  class SquarePegAdapter extends RoundPeg {
    constructor(private _peg: SquarePeg) {
      super(null);
    }

    get radius(): number {
      return (this._peg.width * Math.sqrt(2)) / 2;
    }
  }

  class Application {
    public main(): void {
      const hole = new RoundHole(5);
      const roundPeg = new RoundPeg(5);
      console.log(hole.fits(roundPeg)); // true

      const smallSquarePeg = new SquarePeg(5);
      const largeSquarePeg = new SquarePeg(10);
      // hole.fits(smallSquarePeg) // this won't compile (incompatible types)

      const smallSquarePegAdapter = new SquarePegAdapter(smallSquarePeg);
      const largeSquarePegAdapter = new SquarePegAdapter(largeSquarePeg);
      console.log(hole.fits(smallSquarePegAdapter)); // true
      console.log(hole.fits(largeSquarePegAdapter)); // false
    }
  }

  new Application().main();
}
