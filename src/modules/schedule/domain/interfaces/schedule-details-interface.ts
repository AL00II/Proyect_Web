import { ScheduleDetail } from '../entities/schedule-detail.entity';

export  abstract class  IDScheduleRepository{
      
     abstract create(detail:ScheduleDetail):Promise<ScheduleDetail>

}