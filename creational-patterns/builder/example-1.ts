namespace BuilderExample1 {
  class Car {
    private _seats: number;
    private _engine: string;
    private _tripComputer: boolean;
    private _gps: boolean;

    set seats(value: number) {
      this._seats = value;
    }

    set engine(value: string) {
      this._engine = value;
    }

    set tripComputer(exists: boolean) {
      this._tripComputer = exists;
    }

    set gps(value: boolean) {
      this._gps = value;
    }

    get seats(): number {
      return this._seats;
    }

    get engine(): string {
      return this._engine;
    }

    get tripComputer(): boolean {
      return this._tripComputer;
    }

    get gps(): boolean {
      return this._gps;
    }
  }

  class Manual {
    private _seatsDoc: string;
    private _engineDoc: string;
    private _tripComputerDoc: string;
    private _gpsDoc: string;

    set seatsDoc(value: string) {
      this._seatsDoc = value;
    }

    set engineDoc(value: string) {
      this._engineDoc = value;
    }

    set tripComputerDoc(value: string) {
      this._tripComputerDoc = value;
    }

    set gpsDoc(value: string) {
      this._gpsDoc = value;
    }

    get seatsDoc(): string {
      return this._seatsDoc;
    }

    get engineDoc(): string {
      return this._engineDoc;
    }

    get tripComputerDoc(): string {
      return this._tripComputerDoc;
    }

    get gpsDoc(): string {
      return this._gpsDoc;
    }
  }

  interface Builder {
    reset(): void;
    setSeats(seats: number): void;
    setEngine(engine: string): void;
    setTripComputer(tripComputer: boolean): void;
    setGPS(gps: boolean): void;
  }

  class CarBuilder implements Builder {
    private _car: Car;

    constructor() {
      this.reset();
    }

    public reset(): void {
      this._car = new Car();
    }

    public setSeats(seats: number): void {
      this._car.seats = seats;
    }

    public setEngine(engine: string): void {
      this._car.engine = engine;
    }

    public setTripComputer(tripComputer: boolean): void {
      this._car.tripComputer = tripComputer;
    }

    public setGPS(gps: boolean): void {
      this._car.gps = gps;
    }

    public getProduct(): Car {
      const car: Car = this._car;
      this.reset();
      return car;
    }
  }

  class CarManualBuilder implements Builder {
    private _manual: Manual;

    constructor() {
      this.reset();
    }

    public reset(): void {
      this._manual = new Manual();
    }

    public setSeats(seats: number): void {
      this._manual.seatsDoc = `This car has ${seats} seats.`;
    }

    public setEngine(engine: string): void {
      this._manual.engineDoc = `This car has ${engine} engine.`;
    }

    public setTripComputer(tripComputer: boolean): void {
      if (tripComputer)
        this._manual.tripComputerDoc = `This car has a trip computer.`;
      else this._manual.tripComputerDoc = `This car has not a trip computer.`;
    }

    public setGPS(gps: boolean): void {
      if (gps) this._manual.gpsDoc = `This car has a GPS.`;
      else this._manual.gpsDoc = `This car has not a GPS.`;
    }

    public getProduct(): Manual {
      const manual: Manual = this._manual;
      this.reset();
      return manual;
    }
  }

  class Director {
    private _builder: Builder;

    set builder(builder: Builder) {
      this._builder = builder;
    }

    public constructSportsCar(builder: Builder): void {
      builder.reset();
      builder.setSeats(2);
      builder.setEngine("SportEngine");
      builder.setTripComputer(true);
      builder.setGPS(true);
    }

    public constructSUV(builder: Builder): void {
      /**
       * Another steps to construct another product
       */
    }
  }

  class Application {
    public makeCar() {
      const director = new Director();

      const carBuilder: CarBuilder = new CarBuilder();
      director.constructSportsCar(carBuilder);
      const car = carBuilder.getProduct();

      const carManualBuilder: CarManualBuilder = new CarManualBuilder();
      director.constructSportsCar(carManualBuilder);

      const manual = carManualBuilder.getProduct();

      console.log(car);
      console.log(manual);
    }
  }

  new Application().makeCar();
}
