import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma.service";
import { IDScheduleRepository } from "../../domain/interfaces/schedule-details-interface";
import { ScheduleDetail } from "../../domain/entities/schedule-detail.entity";
import { ScheduleDetailMapper } from "../mappers/schedule-detail-mapper";
import { UpdateScheduleDetailDto } from "../../application/dto/update-schedule-detail.dto";

@Injectable()
export class DetailsRepo implements IDScheduleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(detail: ScheduleDetail): Promise<ScheduleDetail> {
    const data = {
      ...detail,
      id: undefined,
    };

    const created = await this.prisma.scheduleDetail.create({ data });
    return ScheduleDetailMapper.toEntety(created);
  }

  async update(id: string, dto: UpdateScheduleDetailDto): Promise<ScheduleDetail | null> {
    const updated = await this.prisma.scheduleDetail.update({
      where: { id },
      data: {
        week_day: dto.week_day,
        check_in: dto.check_in,
        check_out: dto.check_out,
        lunch_start: dto.lunch_start,
        lunch_end: dto.lunch_end,
        is_active: dto.is_active,
        updated_by: dto.updated_by,
        updated_at: new Date(),
      },
    });

    return ScheduleDetailMapper.toEntety(updated);
  }

  async findByScheduleSetId(scheduleSetId: string): Promise<ScheduleDetail[]> {
    const details = await this.prisma.scheduleDetail.findMany({
      where: { schedules_set_id: scheduleSetId },
    });

    return details.map(ScheduleDetailMapper.toEntety);
  }
}