namespace StateExample1 {
  class Button {
    public onClick(action: Function): void {
      action();
    }
  }

  class UserInterface {
    private _lockButton: Button;
    private _playButton: Button;
    private _nextButton: Button;
    private _prevButton: Button;

    constructor() {
      this._lockButton = new Button();
      this._playButton = new Button();
      this._nextButton = new Button();
      this._prevButton = new Button();
    }

    public get lockButton(): Button {
      return this._lockButton;
    }

    public get playButton(): Button {
      return this._playButton;
    }

    public get nextButton(): Button {
      return this._nextButton;
    }

    public get prevButton(): Button {
      return this._prevButton;
    }
  }

  class Song {
    constructor(private _name: string) {}

    public get name(): string {
      return this._name;
    }
  }

  class Playlist {
    private _index: number = 0;

    constructor(private _songs: Song[]) {}

    public get size(): number {
      return this._songs.length;
    }

    public get first(): Song {
      this._index = 0;
      return this._songs[this._index];
    }

    public get next(): Song {
      this._index++;
      if (this._index === this.size) {
        this._index = 0;
      }
      return this._songs[this._index];
    }

    public get previous(): Song {
      this._index--;
      if (this._index < 0) {
        this._index = this.size - 1;
      }

      return this._songs[this._index];
    }
  }

  class AudioPlayer {
    private state: State;
    private UI: UserInterface;
    private volume: number;
    private playlist: Playlist;
    private currentSong: Song;
    private time: number;

    constructor() {
      this.volume = 50;
      this.playlist = new Playlist([
        new Song("song-1"),
        new Song("song-2"),
        new Song("song-3"),
        new Song("song-4"),
      ]);
      this.state = new ReadyState(this);

      this.UI = new UserInterface();
      this.UI.lockButton.onClick(this.clickLock);
      this.UI.playButton.onClick(this.clickPlay);
      this.UI.nextButton.onClick(this.clickNext);
      this.UI.prevButton.onClick(this.clickPrevious);
    }

    public changeState(state: State): void {
      this.state = state;
    }

    public clickLock(): void {
      this.state.clickLock();
    }

    public clickPlay(): void {
      this.state.clickPlay();
    }

    public clickNext(): void {
      this.state.clickNext();
    }

    public clickPrevious(): void {
      this.state.clickPrevious();
    }

    public startPlayback(): void {
      this.currentSong = this.playlist.first;
      console.log(`Playing ${this.currentSong.name}`);
    }

    public stopPlayback(): void {
      this.currentSong = null;
    }

    public nextSong(): void {
      this.currentSong = this.playlist.next;
    }

    public previousSong(): void {
      this.currentSong = this.playlist.previous;
    }

    public fastForward(time: number): void {
      this.time = time;
    }

    public rewind(time: number): void {
      this.time = time;
    }

    public get playing() {
      return this.state instanceof PlayingState;
    }
  }

  enum Event {
    click,
    doubleclick,
  }

  abstract class State {
    protected event: Event = Event.click;
    constructor(protected player: AudioPlayer) {}

    abstract clickLock(): void;
    abstract clickPlay(): void;
    abstract clickNext(): void;
    abstract clickPrevious(): void;
  }

  class LockedState extends State {
    public clickLock(): void {
      if (this.player.playing)
        this.player.changeState(new PlayingState(this.player));
      else this.player.changeState(new ReadyState(this.player));
    }

    public clickPlay(): void {}

    public clickNext(): void {}

    public clickPrevious(): void {}
  }

  class ReadyState extends State {
    public clickLock(): void {
      this.player.changeState(new LockedState(this.player));
    }

    public clickPlay(): void {
      this.player.startPlayback();
      this.player.changeState(new PlayingState(this.player));
    }

    public clickNext(): void {
      this.player.nextSong();
    }

    public clickPrevious(): void {
      this.player.previousSong();
    }
  }

  class PlayingState extends State {
    public clickLock(): void {
      this.player.changeState(new LockedState(this.player));
    }

    public clickPlay(): void {
      this.player.stopPlayback();
      this.player.changeState(new ReadyState(this.player));
    }

    public clickNext(): void {
      if (this.event == Event.doubleclick) this.player.nextSong();
      else this.player.fastForward(5);
    }

    public clickPrevious(): void {
      if (this.event == Event.doubleclick) this.player.previousSong();
      else this.player.rewind(5);
    }
  }

  new AudioPlayer().startPlayback();
}
