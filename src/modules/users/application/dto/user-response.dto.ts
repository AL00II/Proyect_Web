export class UserResponseDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly last_name: string,
    public readonly email: string,
    public readonly active: boolean,
  ) {}
}
