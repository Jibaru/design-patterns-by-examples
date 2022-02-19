namespace IteratorExample1 {
  interface SocialNetwork {
    createFriendsIterator(profileId: string): ProfileIterator;
    createCoworkersIterator(profileId: string): ProfileIterator;
  }

  class Facebook implements SocialNetwork {
    public createFriendsIterator(profileId: string): ProfileIterator {
      return new FacebookIterator(this, profileId, "friends");
    }
    public createCoworkersIterator(profileId: string): ProfileIterator {
      return new FacebookIterator(this, profileId, "coworkers");
    }

    public socialGraphRequest(profileId: string, type: string): Profile[] {
      console.log(`Friends of ${profileId} user with type ${type}`);
      return [
        new Profile("fb001", "user01@example.com"),
        new Profile("lkd002", "user02@example.com"),
        new Profile("lkd003", "user03@example.com"),
        new Profile("lkd004", "user04@example.com"),
        new Profile("lkd005", "user05@example.com"),
        new Profile("lkd006", "user06@example.com"),
      ].filter((profile) => profile.getId() !== profileId);
    }
  }

  class LinkedIn implements SocialNetwork {
    public createFriendsIterator(profileId: string): ProfileIterator {
      return new LinkedInIterator(this, profileId, "friends");
    }
    public createCoworkersIterator(profileId: string): ProfileIterator {
      return new LinkedInIterator(this, profileId, "coworkers");
    }

    public socialGraphRequest(profileId: string, type: string): Profile[] {
      console.log(`Friends of ${profileId} user with type ${type}`);
      return [
        new Profile("lkd001", "user01@example.com"),
        new Profile("lkd002", "user02@example.com"),
        new Profile("lkd003", "user03@example.com"),
        new Profile("lkd004", "user04@example.com"),
        new Profile("lkd005", "user05@example.com"),
        new Profile("lkd006", "user06@example.com"),
      ].filter((profile) => profile.getId() !== profileId);
    }
  }

  class Profile {
    constructor(private _id: string, private _email: string) {}

    public getId(): string {
      return this._id;
    }

    public getEmail(): string {
      return this._email;
    }
  }

  interface ProfileIterator {
    getNext(): Profile;
    hasMore(): boolean;
  }

  class FacebookIterator implements ProfileIterator {
    private _currentPosition: number = 0;
    private _cache: Profile[];

    constructor(
      private _facebook: Facebook,
      private _profileId: string,
      private _type: string
    ) {}

    private lazyInit(): void {
      if (this._cache == null)
        this._cache = this._facebook.socialGraphRequest(
          this._profileId,
          this._type
        );
    }

    public getNext(): Profile {
      if (this.hasMore()) {
        return this._cache[this._currentPosition++];
      }
    }

    public hasMore(): boolean {
      this.lazyInit();
      return this._currentPosition < this._cache.length;
    }
  }

  class LinkedInIterator implements ProfileIterator {
    private _currentPosition: number = 0;
    private _cache: Profile[];

    constructor(
      private _linkedIn: LinkedIn,
      private _profileId: string,
      private _type: string
    ) {}

    private lazyInit(): void {
      if (this._cache == null)
        this._cache = this._linkedIn.socialGraphRequest(
          this._profileId,
          this._type
        );
    }

    public getNext(): Profile {
      if (this.hasMore()) {
        return this._cache[this._currentPosition++];
      }
    }

    public hasMore(): boolean {
      this.lazyInit();
      return this._currentPosition < this._cache.length;
    }
  }

  class SocialSpammer {
    public send(iterator: ProfileIterator, message: string) {
      while (iterator.hasMore()) {
        const profile = iterator.getNext();
        System.sendEmail(profile.getEmail(), message);
      }
    }
  }

  class System {
    public static sendEmail(email: string, message: string): void {
      console.log(`Email sended to ${email}: ${message}`);
    }
  }

  class Application {
    private _network: SocialNetwork;
    private _spammer: SocialSpammer;
    private _working: string = "Facebook";

    public config(): void {
      if (this._working === "Facebook") this._network = new Facebook();
      if (this._working === "LinkedIn") this._network = new LinkedIn();
      this._spammer = new SocialSpammer();
    }

    public sendSpamToFriends(profile: Profile): void {
      const iterator = this._network.createFriendsIterator(profile.getId());
      this._spammer.send(iterator, "Very important message");
    }

    public sendSpamToCoworkers(profile: Profile): void {
      const iterator = this._network.createCoworkersIterator(profile.getId());
      this._spammer.send(iterator, "Very important message");
    }

    public main(): void {
      this._working = "Facebook";
      this.config();
      this.sendSpamToFriends(new Profile("fb001", "user01@example.com"));
      this.sendSpamToCoworkers(new Profile("fb001", "user01@example.com"));
    }
  }

  new Application().main();
}
