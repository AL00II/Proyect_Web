export class Employee {
  constructor(
    public readonly id: string,
    public name: string,
    public last_name: string,
    public matricula: string,
    public phone: string,
    public facial_vector: number[] | null,
    public URL_photo: string | null,
    public active: boolean,
    public created_by_id: string,
    public updated_by_id?: string | null,
    public schedule_set_id?: string | null,
    public createdAt?: Date | null,
    public updatedAt?: Date | null,
  ) {}
}
