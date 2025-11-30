export class EmployeeScheduleMapper {
  static toTodayResult(emp: any, detail: any) {
    return {
      id: emp.id,
      name: emp.name,
      last_name: emp.last_name,
      facial_vector: emp.facial_vector ?? null,
      photo: emp.URL_photo ?? null,

      scheduleDetail: detail
        ? {
            id: detail.id,
            week_day: detail.week_day,
            check_in: detail.check_in,
            check_out: detail.check_out,
            lunch_start: detail.lunch_start,
            lunch_end: detail.lunch_end,
          }
        : null
    };
  }
}
