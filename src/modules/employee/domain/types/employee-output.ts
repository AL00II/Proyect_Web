export type EmployeeOutput = {
  name: string;
  last_name: string;
  matricula: string;
  facial_vector: string | null;
  URL_photo: string | null;
  active: boolean;
  created_by_id: string;
  updated_by_id: string | null;
};