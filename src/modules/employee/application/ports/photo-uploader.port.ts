

export abstract class PhotoUploaderPort {
  abstract upload(file: Buffer): Promise<string>;
}
