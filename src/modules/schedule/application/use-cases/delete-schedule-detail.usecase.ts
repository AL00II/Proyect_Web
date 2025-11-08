import { Injectable } from "@nestjs/common";
import { IScheduleDetailRepository } from "../../domain/interfaces/schedule-detail.repository.interface";

@Injectable()
export class DeleteScheduleDetailUseCase {
  constructor(private readonly repository: IScheduleDetailRepository) {}

  async execute(id: string): Promise<string> {
    await this.repository.deleteDetail(id);
    return `Registro ${id} eliminado.`;
  }
  
}