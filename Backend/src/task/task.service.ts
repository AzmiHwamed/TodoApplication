import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task)
  private readonly taskRepository: Repository<Task>,) { }

  async findMyTask(userId: number) {
    return await this.taskRepository.find({
      where: { user: { id: userId } },
    });}

  async create(createTaskDto: CreateTaskDto,
    uid: number,
  ) {
    const task = this.taskRepository.create({ title: createTaskDto.title, description: createTaskDto.description, status: false, priority: createTaskDto.priority, user: { id: uid } ,createdAt:new Date().toLocaleDateString()});
    return this.taskRepository.save(task);
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  async findOne(id: number) {
    return await this.taskRepository.findOne({
      where :{id:id}
    });
  }

  async update(id: number, updateTaskDto: Task) {
    return await this.taskRepository.update(id, updateTaskDto);
  }

  async remove(id: number) {
    return await this.taskRepository.delete(id);
  }

}
