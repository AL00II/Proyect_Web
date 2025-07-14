import { Rule } from '../entities/rule.entity';

export interface RuleRepository {
  create(rule: Rule): Promise<Rule>;
  findByName(name: string): Promise<Rule | null>;
  findById(id: string): Promise<Rule | null>; 
  findAllGlobal(): Promise<Rule[]>;
  findAllGlobal(): Promise<Rule[]>;
  update(id: string, data: Partial<Rule>, updatedById: string): Promise<Rule>;
  delete(id: string): Promise<void>;


}