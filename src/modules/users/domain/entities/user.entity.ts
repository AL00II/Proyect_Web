export class User {
  constructor(
    public readonly name: string,
    public readonly last_name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly active: boolean,
    public readonly id?: string,
  ) {}
}
