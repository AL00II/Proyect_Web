export type EmployeeOutput = {
  id?: string | null;
  name: string;
  last_name: string;
  matricula: string;
  phone: string;
  facial_vector: string | null;
  URL_photo: string | null;
  active: boolean;
  created_by_id: string;
  created_at?: Date | null;
  updated_by_id?: string | null;
  updated_at?: Date | null;
};
