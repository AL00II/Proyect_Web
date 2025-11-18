export type EmployeeUpdateInput = {
    name?: string;
    last_name?: string;
    matricula?: string;
    phone?: string;
    facial_vector?: number[] | null;
    URL_photo?: string | null;
    active?: boolean;
    updated_by_id: string;
};