export interface IScheduleDetail {
  week_day: number;
  check_in: Date;
  check_out: Date;
  lunch_start?: Date;
  lunch_end?: Date;
}

export interface IScheduleSetCreate {
  name: string;
  description?: string;
  details: IScheduleDetail[];
}
