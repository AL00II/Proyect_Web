import { Rule } from '../entities/rule.entity';

export abstract class IRuleRepository {
  abstract create(rule: Rule): Promise<Rule>;
  abstract findByName(name: string): Promise<Rule | null>;
  abstract findById(id: string): Promise<Rule | null>; 
  abstract findAllGlobal(): Promise<Rule[]>;
  abstract findAllGlobal(): Promise<Rule[]>;
  abstract update(id: string, data: Partial<Rule>, updatedById: string): Promise<Rule>;
  abstract delete(id: string): Promise<void>;
  abstract getApplicableRulesForEmployee(employeeId: string): Promise<Rule[]>;


}