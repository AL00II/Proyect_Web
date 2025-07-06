export class User {
  constructor(
    public name: string,
    public last_name: string,
    public email: string,
    public password: string,
    public role: string,
    public active: boolean,
    public readonly id?: string,
  ) {}
}
