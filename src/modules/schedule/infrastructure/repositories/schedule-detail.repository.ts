import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../../../core/database/prisma.service";
import { ScheduleDetail } from "../../domain/entities/schedule-detail.entity";
import { IScheduleDetailRepository } from "../../domain/interfaces/schedule-detail.repository.interface";
import { ScheduleDetailMapper } from "../mappers/schedule-detail.mapper";

@Injectable()
export class ScheduleDetailRepository implements IScheduleDetailRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createDetail(detail: ScheduleDetail): Promise<ScheduleDetail> {
   const { id, created_at, updated_at, updated_by, ...data } = detail;
    const created = await this.prisma.scheduleDetail.create({ data });
    return ScheduleDetailMapper.toEntity(created);
  }

  async findByScheduleSetId(scheduleSetId: string): Promise<ScheduleDetail[]> {
    const records = await this.prisma.scheduleDetail.findMany({
      where: { schedules_set_id: scheduleSetId },
    });

    return records.map(ScheduleDetailMapper.toEntity);
  }

  async updateDetail(id: string, data: Partial<ScheduleDetail>): Promise<ScheduleDetail> {
      const updated = await this.prisma.scheduleDetail.update({
        where: { id },
        data, 
      });

      return ScheduleDetailMapper.toEntity(updated);
  }
  async deleteDetail(id: string): Promise<string> {
    try {
      await this.prisma.scheduleDetail.delete({ where: { id } });
      return ''
    } catch (err)  {
      return (err.message)
    }
  }
}
