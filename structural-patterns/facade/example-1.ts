namespace FacadeExample1 {
  /**
   * Subsystem classes and types
   */

  type Buffer = {
    filename: string;
    codec: Codec;
  };

  class File {
    constructor(private _buffer: Buffer) {}

    public save(): void {
      console.log(`File saved: ${this._buffer}`);
    }
  }

  class VideoFile {
    constructor(private _filename: string) {}
  }

  abstract class Codec {}

  class OggCompressionCodec extends Codec {}

  class MPEG4CompressionCodec extends Codec {}

  class CodecFactory {
    public static extract(file: VideoFile) {
      return new CodecFactory();
    }
  }

  class BitrateReader {
    public static read(filename: string, codec: Codec): Buffer {
      return {
        filename,
        codec,
      };
    }

    public static convert(buffer: Buffer, destinationCodec: Codec): Buffer {
      return {
        filename: buffer.filename,
        codec: destinationCodec,
      };
    }
  }

  class AudioMixer {
    public fix(buffer: Buffer): Buffer {
      return buffer;
    }
  }

  /**
   * Facade class
   */
  class VideoConverter {
    public convert(filename: string, format: string): File {
      const file = new VideoFile(filename);
      const sourceCodec = CodecFactory.extract(file);

      const destinationCodec: Codec = (() => {
        if (format == "mp4") return new MPEG4CompressionCodec();
        else return new OggCompressionCodec();
      })();

      const buffer = BitrateReader.read(filename, sourceCodec);
      let result = BitrateReader.convert(buffer, destinationCodec);
      result = new AudioMixer().fix(result);
      return new File(result);
    }
  }

  class Application {
    public main() {
      const convertor = new VideoConverter();
      const mp4 = convertor.convert("funny-cats-video.ogg", "mp4");
      mp4.save();
    }
  }

  new Application().main();
}
