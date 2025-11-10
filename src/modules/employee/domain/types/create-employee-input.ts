export type CreateEmployeeInput = {
  name: string;
  last_name: string;
  matricula: string;
  phone: string;
  facial_vector: string | null;
  URL_photo: string | null;
  active: boolean;
};
