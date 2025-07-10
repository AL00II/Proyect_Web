import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/database/prisma.service";
import { IDScheduleRepository } from "../../domain/interfaces/schedule-details-interface";
import { ScheduleDetail } from "../../domain/entities/schedule-detail.entity";
import { ScheduleDetailMapper } from "../mappers/schedule-detail-mapper";

@Injectable()
export class DetailsRepo implements IDScheduleRepository{
     constructor (private readonly prisma : PrismaService){

     }
   async create(detail: ScheduleDetail): Promise<ScheduleDetail> {
        const data = {
             ...detail, 
             id:undefined,

        }

          const created = await this.prisma.scheduleDetail.create({ data });
          return ScheduleDetailMapper.toEntety(created)
    }
}