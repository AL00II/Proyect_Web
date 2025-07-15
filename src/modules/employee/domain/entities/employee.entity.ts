export class Employee {
  constructor(
    public name: string,
    public last_name: string,
    public matricula: string,
    public facial_vector: string | null,
    public URL_photo: string | null,
    public active: boolean,
    public created_by_id: string,
    public updated_by_id: string | null,
    public readonly id?: string,
    
  ) {}
}