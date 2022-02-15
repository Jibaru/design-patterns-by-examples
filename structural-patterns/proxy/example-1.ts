namespace ProxyExample1 {
  type Video = {
    id: string;
    name: string;
    url: string;
  };

  const Cloud = {
    videos: [
      { id: "video-1", name: "Video 1", url: "https://ytube.com/video-1" },
      { id: "video-2", name: "Video 2", url: "https://ytube.com/video-2" },
      { id: "video-3", name: "Video 3", url: "https://ytube.com/video-3" },
      { id: "video-4", name: "Video 4", url: "https://ytube.com/video-4" },
    ],
  };

  interface ThirdPartyYouTubeLib {
    listVideos(): Video[];
    getVideoInfo(id: string): string;
    downloadVideo(id: string): void;
  }

  class ThirdPartyYouTubeClass implements ThirdPartyYouTubeLib {
    public listVideos(): Video[] {
      return Cloud.videos;
    }

    public getVideoInfo(id: string): string {
      const video = Cloud.videos.find((video) => video.id === id);
      return `${video.id} is ${video.name}`;
    }

    public downloadVideo(id: string): void {
      console.log(`Video with id ${id} was downloaded`);
    }
  }

  class CachedYouTubeClass implements ThirdPartyYouTubeLib {
    private _service: ThirdPartyYouTubeLib;
    private _listCache: Video[] = null;
    private _videoCache: Map<string, string> = null;
    private _needReset: boolean = false;

    constructor(service: ThirdPartyYouTubeLib) {
      this._service = service;
    }

    public listVideos(): Video[] {
      if (this._listCache === null || this._needReset) {
        this._listCache = this._service.listVideos();
      }
      return this._listCache;
    }

    public getVideoInfo(id: string) {
      if (this._videoCache == null || this._needReset) {
        const videoInfo = this._service.getVideoInfo(id);
        this._videoCache = new Map();
        this._videoCache.set(id, videoInfo);

        return videoInfo;
      }

      return this._videoCache.get(id);
    }

    public downloadVideo(id: string): void {
      if (!this.downloadExists(id) || this._needReset)
        this._service.downloadVideo(id);
    }

    private downloadExists(id: string): boolean {
      return (
        this._listCache !== null &&
        !!this._listCache.find((video) => video.id === id)
      );
    }
  }

  class YouTubeManager {
    constructor(protected _service: ThirdPartyYouTubeLib) {}

    public renderVideoPage(id: string): void {
      const info = this._service.getVideoInfo(id);
      console.log(info);
    }

    public renderListPanel(): void {
      const list = this._service.listVideos();
      console.log(list);
    }

    public reactOnUserInput(input: string): void {
      this.renderVideoPage(input);
      this.renderListPanel();
    }
  }

  class Application {
    public init(): void {
      const aYouTubeService = new ThirdPartyYouTubeClass();
      const aYouTubeProxy = new CachedYouTubeClass(aYouTubeService);
      const manager = new YouTubeManager(aYouTubeProxy);
      manager.reactOnUserInput("video-1");
    }
  }

  new Application().init();
}
