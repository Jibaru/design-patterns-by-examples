namespace BridgeExample1 {
  class RemoteControl {
    constructor(protected _device: Device) {}

    public togglePower(): void {
      if (this._device.isEnabled()) {
        this._device.disable();
      } else {
        this._device.enable();
      }
    }

    public volumeDown(): void {
      this._device.volume = this._device.volume - 10;
    }

    public volumeUp(): void {
      this._device.volume = this._device.volume + 10;
    }

    public channelDown(): void {
      this._device.channel = this._device.channel - 1;
    }

    public channelUp(): void {
      this._device.channel = this._device.channel + 1;
    }
  }

  class AdvancedRemoteControl extends RemoteControl {
    public mute(): void {
      this._device.volume = 0;
    }
  }

  interface Device {
    isEnabled(): boolean;
    enable(): void;
    disable(): void;
    get volume(): number;
    set volume(percent: number);
    get channel(): number;
    set channel(channel: number);
  }

  class Tv implements Device {
    private _isEnabled: boolean = true;
    private _volume: number = 50;
    private _channel: number = 1;

    isEnabled(): boolean {
      return this._isEnabled;
    }
    enable(): void {
      this._isEnabled = true;
    }
    disable(): void {
      this._isEnabled = false;
    }
    get volume(): number {
      return this._volume;
    }
    set volume(percent: number) {
      this._volume = percent;
    }
    get channel(): number {
      return this._channel;
    }
    set channel(channel: number) {
      this._channel = channel;
    }
  }

  class Radio implements Device {
    private _isEnabled: boolean = true;
    private _volume: number = 50;
    private _channel: number = 1;

    isEnabled(): boolean {
      return this._isEnabled;
    }
    enable(): void {
      this._isEnabled = true;
    }
    disable(): void {
      this._isEnabled = false;
    }
    get volume(): number {
      return this._volume;
    }
    set volume(percent: number) {
      this._volume = percent;
    }
    get channel(): number {
      return this._channel;
    }
    set channel(channel: number) {
      this._channel = channel;
    }
  }

  class Application {
    public main(): void {
      const tv = new Tv();
      let remote: RemoteControl = new RemoteControl(tv);
      remote.togglePower();

      console.log(tv);
      console.log(remote);

      const radio = new Radio();
      remote = new AdvancedRemoteControl(radio);

      console.log(radio);
      console.log(remote);
    }
  }

  new Application().main();
}
