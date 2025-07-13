import { Rule } from '../entities/rule.entity';

export interface RuleRepository {
  create(rule: Rule): Promise<Rule>;
  findByName(name: string): Promise<Rule | null>;
  findById(id: string): Promise<Rule | null>; 
}