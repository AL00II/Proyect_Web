import { Employee } from "./employee.entity";

export class EmployeeWithSchedule extends Employee {
  public schedule_set?: {
    id: string;
    name: string;
    details: {
      id: string;
      week_day: number;
      check_in: Date;
      check_out: Date;
      lunch_start: Date | null;
      lunch_end: Date | null;
    }[];
  };

  constructor({
    id,
    name,
    last_name,
    matricula,
    phone,
    facial_vector,
    URL_photo,
    active,
    created_by_id,
    updated_by_id,
    schedule_set_id,
    createdAt,
    updatedAt
  }: Employee,
  schedule_set?: EmployeeWithSchedule['schedule_set']) {
    super(
      id,
      name,
      last_name,
      matricula,
      phone,
      facial_vector,
      URL_photo,
      active,
      created_by_id,
      updated_by_id,
      schedule_set_id,
      createdAt,
      updatedAt
    );

    this.schedule_set = schedule_set;
  }
}
