import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { Task } from './entities/task.entity';
interface AuthenticatedRequest extends Request {
  user: { id: number; username: string }; // Ensure it matches what `validate()` returns in JWTStrategy
}  
@UseGuards(AuthGuard('jwt'))
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Get('myTasks')
  async MyTasks(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    return res.status(200).json(await this.taskService.findMyTask(req.user.id));
  } 
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto,@Req() req: AuthenticatedRequest) {
    return await this.taskService.create(createTaskDto,req.user.id);
  }

  @Get()
  async findAll() {
    return await this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.taskService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: Task) {
    return await this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.taskService.remove(+id);
  }
  
}
