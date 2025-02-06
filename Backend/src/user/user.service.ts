import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthDto } from 'src/auth/dto/AuthDto';
import * as argon from 'argon2';


@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
      private readonly userRepository: Repository<User>,) { }
  async create(authDto: AuthDto) {
    const hashed = await argon.hash(authDto.password);
    const user = this.userRepository.create({ username: authDto.email, hashedPassword: hashed });
    return user;
  }

  async save(user: User) {
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // PostgreSQL error code for unique constraint violation
        throw new ConflictException('Username already exists');
      }
      throw error; // Re-throw other errors
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({where:{username:id}});
  }

  async update(id: number, updateUserDto: User) {
    return await this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
