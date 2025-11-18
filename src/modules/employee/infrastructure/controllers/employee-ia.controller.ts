import { Controller, Post, UploadedFile, Body, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateEmployeeWithIAUseCase } from '../../application/use-cases/create-employee-ia.usecase';
import { Public } from 'src/core/decorators/public.decorator';


@Controller('employees-ia')
export class EmployeeIAController {
  constructor(
    private readonly createEmployeeWithIAUseCase: CreateEmployeeWithIAUseCase,
  ) {}
  
  @Public()
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async createEmployeeIA(
    @Body() body,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    const createdById = 'hafgjajfjkd';
    return this.createEmployeeWithIAUseCase.execute(body, photo, createdById);
  }

}
