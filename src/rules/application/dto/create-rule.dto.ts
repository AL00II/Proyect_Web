export class CreateRuleDto {
  readonly name: string;
  readonly type: string;
  readonly description?: string;
  readonly valid?: boolean;
  readonly isGlobal?: boolean;
  readonly employeeId?: string; 
}