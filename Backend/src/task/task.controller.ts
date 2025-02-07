import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { Task } from './entities/task.entity';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
interface AuthenticatedRequest extends Request {
  user: { id: number; username: string }; // Ensure it matches what `validate()` returns in JWTStrategy
}
@ApiTags('Tasks')
@UseGuards(AuthGuard('jwt'))
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }
  @ApiOperation({ summary: 'Takes the AuthenticatedRequest as a request , return the tasks that the user has created' })
  @ApiResponse({
    status: 200,
    description: 'The operation hass been successfully executed.',
    type: [Task],
  })
  @ApiResponse({
    status: 401,
    description: 'The operation failed due to an error.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Unauthorized' },
        statuscode: { type: 'number', example: '401' },
      },
    },
  })
  @ApiHeader({
    name: '-H "Authorization: Bearer {token}',
    description: 'Authorization header to be used in the request (access token)'
  })
  @Get('myTasks')
  async MyTasks(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    return res.status(200).json(await this.taskService.findMyTask(req.user.id));
  }






  @ApiOperation({ summary: 'Takes the CreateTaskDto as a body , return the created task' })
  @ApiResponse({
    status: 201,
    description: 'The operation hass been successfully executed.',
    type: Task,
  })
  @ApiResponse({
    status: 401,
    description: 'The operation failed due to an error.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Unauthorized' },
        statuscode: { type: 'number', example: '401' },
      },
    },
  })
  @ApiHeader({
    name: '-H "Authorization: Bearer {token}',
    description: 'Authorization header to be used in the request (access token)'
  })
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Req() req: AuthenticatedRequest) {
    return await this.taskService.create(createTaskDto, req.user.id);
  }






  @ApiOperation({ summary: 'return all the tasks' })
  @ApiResponse({
    status: 200,
    description: 'The operation hass been successfully executed.',
    type: [Task],
  })
  @ApiResponse({
    status: 401,
    description: 'The operation failed due to an error.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Unauthorized' },
        statuscode: { type: 'number', example: '401' },
      },
    },
  })
  @ApiHeader({
    name: '-H "Authorization: Bearer {token}',
    description: 'Authorization header to be used in the request (access token)'
  })
  @Get()
  async findAll() {
    return await this.taskService.findAll();
  }





  @ApiOperation({ summary: 'Takes the id as a parameter , return the task with the id' })
  @ApiResponse({
    status: 200,
    description: 'The operation hass been successfully executed.',
    type: Task,
  })
  @ApiResponse({
    status: 401,
    description: 'The operation failed due to an error.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Unauthorized' },
        statuscode: { type: 'number', example: '401' },
      },
    },
  })
  @ApiHeader({
    name: '-H "Authorization: Bearer {token}',
    description: 'Authorization header to be used in the request (access token)'
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.taskService.findOne(+id);
  }


  
  @ApiOperation({ summary: 'Takes the id as a parameter , return the modified task with the id and save changes' })
  @ApiResponse({
    status: 200,
    description: 'The operation hass been successfully executed.',
    type: Task,
  })
  @ApiResponse({
    status: 401,
    description: 'The operation failed due to an error.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Unauthorized' },
        statuscode: { type: 'number', example: '401' },
      },
    },
  })
  @ApiHeader({
    name: '-H "Authorization: Bearer {token}',
    description: 'Authorization header to be used in the request (access token)'
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: Task) {
    return await this.taskService.update(+id, updateTaskDto);
  }




  @ApiOperation({ summary: 'Takes the id as a parameter , remove the task with the id' })
  @ApiResponse({
    status: 200,
    description: 'The operation hass been successfully executed.',
    schema: {
      type: 'object',
    }
  })
  @ApiResponse({
    status: 401,
    description: 'The operation failed due to an error.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Unauthorized' },
        statuscode: { type: 'number', example: '401' },
      },
    },
  })
  @ApiHeader({
    name: '-H "Authorization: Bearer {token}',
    description: 'Authorization header to be used in the request (access token)'
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.taskService.remove(+id);
  }

}
