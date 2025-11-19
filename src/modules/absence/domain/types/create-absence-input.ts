export type CreateAbsenceInput = {
  employeeId: string;
  scheduleDetailId?: string;
  type: string;
  startDate: Date;
  endDate: Date;
  reason?: string;
  createdBy: string;
};
