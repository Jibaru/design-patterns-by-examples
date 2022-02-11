namespace SingletonExample1 {
  class Database {
    private static instance: Database;

    private constructor() {}

    public static getInstance(): Database {
      if (!Database.instance) {
        Database.instance = new Database();
      }

      return Database.instance;
    }

    public query(sql: string) {
      /**
       * A class method
       */
    }
  }

  class Application {
    public main(): void {
      const foo: Database = Database.getInstance();
      foo.query("SELECT ...");

      const bar: Database = Database.getInstance();
      bar.query("SELECT ...");

      console.log(`Same instances: ${foo === bar}`);
    }
  }

  new Application().main();
}
