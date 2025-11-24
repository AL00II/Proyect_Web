export class Device {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly token: string,
    public readonly device_id: string,
    public readonly is_active: boolean,
    public readonly last_seen_at: Date,
    public readonly created_at: Date,
    public readonly created_by_id: string,
  ) {}
}
