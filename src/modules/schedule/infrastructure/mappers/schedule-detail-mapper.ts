import { ScheduleDetail as PrismaScheduleDetail} from "generated/prisma";
import { ScheduleDetail } from "../../domain/entities/schedule-detail.entity";

export class ScheduleDetailMapper{
      static toEntety (detailMap:PrismaScheduleDetail): ScheduleDetail{
           return new ScheduleDetail (
             detailMap.id,
             detailMap.week_day,
             detailMap.check_in,
             detailMap.check_out,
             detailMap.lunch_start,
             detailMap.lunch_end,
             detailMap.is_active,
             detailMap.schedules_set_id,
             detailMap.created_by,
             detailMap.updated_by || null,

           );
        }
             
           static toPersistente(detailMap: ScheduleDetail): PrismaScheduleDetail{
             return{
                id:detailMap.id,
                week_day:detailMap.week_day,
                check_in:detailMap.check_in,
                check_out:detailMap.check_out,
                lunch_start:detailMap.lunch_start || null,
                lunch_end:detailMap.lunch_end || null,
                is_active:detailMap.is_active,
                schedules_set_id:detailMap.schedules_set_id,
                created_at:new Date(),
                updated_at: new Date(),
                created_by: detailMap.created_by, // Asegúrate de tenerlo en ScheduleDetail
                updated_by: detailMap.updated_by || null, // opcionalmente null


             };
           }
      }

