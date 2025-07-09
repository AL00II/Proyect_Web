export class RuleResponseDto {
  readonly id: string; // Debe ser string
  readonly name: string;
  readonly type: string;
  readonly description?: string; // Opcional (undefined)
  readonly valid: boolean;
  readonly isGlobal: boolean;
  readonly employeeId: string | null; // string o null
  readonly createdAt: Date;
  readonly updatedAt: Date | null; // Date o null
}