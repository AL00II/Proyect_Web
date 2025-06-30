export class User {
  constructor(
    //Se quita readonly para poder realizar las actualizaciones del usuario
    public name: string,
    public last_name: string,
    public email: string,
    public password: string,
    public active: boolean,
    public readonly id?: string,
  ) {}
}
