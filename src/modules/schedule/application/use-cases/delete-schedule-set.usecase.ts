import { Injectable } from '@nestjs/common';
import { IScheduleRepository } from '../../domain/interfaces/schedule.repository.interface';

@Injectable()
export class DeleteScheduleSetUseCase {
  constructor(private readonly repository: IScheduleRepository) {}

  async execute(id: string): Promise<{ success: boolean; message?: string }> {
    try {
      const hasDetails = await this.repository.hasDetails(id);

      if (hasDetails) {
        return {
          success: false,
          message: 'No se puede eliminar: tiene detalles asociados',
        };
      }

      const deleted = await this.repository.delete(id);
      return {
        success: deleted,
        message: deleted
          ? 'Conjunto eliminado correctamente'
          : 'Conjunto no encontrado',
      };
    } catch (error) {
      throw new Error(`Error eliminando conjunto: ${error.message}`);
    }
  }
}
