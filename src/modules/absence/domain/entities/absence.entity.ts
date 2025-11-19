export class Absence {
  constructor(
    public id: string,
    public employeeId: string,
    public scheduleDetailId: string | null,
    public type: string,
    public startDate: Date,
    public endDate: Date,
    public reason: string | null,
    public status: string = 'pending',
    public createdBy: string,
    public createdAt: Date = new Date(),
    public updatedBy: string | null = null,
    public updatedAt: Date | null = null,
  ) {}

  public isApproved(): boolean {
    return this.status === 'approved';
  }

  public isPending(): boolean {
    return this.status === 'pending';
  }

  public approve(updatedBy: string): void {
    this.status = 'approved';
    this.updatedBy = updatedBy;
    this.updatedAt = new Date();
  }

  public reject(updatedBy: string): void {
    this.status = 'rejected';
    this.updatedBy = updatedBy;
    this.updatedAt = new Date();
  }
}
