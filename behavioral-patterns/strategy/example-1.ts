namespace StrategyExample1 {
  interface Strategy {
    execute(a: number, b: number): number;
  }

  class ConcreteStrategyAdd implements Strategy {
    public execute(a: number, b: number): number {
      return a + b;
    }
  }

  class ConcreteStrategySubtract implements Strategy {
    public execute(a: number, b: number): number {
      return a - b;
    }
  }

  class ConcreteStrategyMultiply implements Strategy {
    public execute(a: number, b: number): number {
      return a * b;
    }
  }

  class Context {
    private _strategy: Strategy;

    public set strategy(strategy: Strategy) {
      this._strategy = strategy;
    }

    public executeStrategy(a: number, b: number): number {
      return this._strategy.execute(a, b);
    }
  }

  class ExampleApplication {
    private context: Context = new Context();

    public main(
      firstNumber: number,
      secondNumber: number,
      action: string
    ): void {
      if (action === "addition")
        this.context.strategy = new ConcreteStrategyAdd();

      if (action === "subtraction")
        this.context.strategy = new ConcreteStrategySubtract();

      if (action === "multiplication")
        this.context.strategy = new ConcreteStrategyMultiply();

      const result = this.context.executeStrategy(firstNumber, secondNumber);

      console.log(`Result: ${result}`);
    }
  }

  new ExampleApplication().main(10, 20, "subtraction");
}
