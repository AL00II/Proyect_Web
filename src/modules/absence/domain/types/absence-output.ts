export type AbsenceOutput = {
  id: string;
  employeeId: string;
  scheduleDetailId: string | null;
  type: string;
  startDate: Date;
  endDate: Date;
  reason: string | null;
  status: string;
  createdBy: string;
  createdAt: Date;
  updatedBy: string | null;
  updatedAt: Date | null;
};
