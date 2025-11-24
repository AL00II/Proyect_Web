

export abstract class PhotoUploaderPort {
  abstract upload(file: Buffer, employeeId: string): Promise<string>;
}
