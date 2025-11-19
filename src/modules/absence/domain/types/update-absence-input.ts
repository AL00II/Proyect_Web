export type UpdateAbsenceInput = {
  type?: string;
  startDate?: Date;
  endDate?: Date;
  reason?: string;
  status?: string;
  updatedBy: string;
};
