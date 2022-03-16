import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    return user;
  }

  async create(user: User): Promise<User> {
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async update(id: number, user: User): Promise<User> {
    const updatedUser = await this.findOne(id);
    updatedUser.name = user.name;
    updatedUser.email = user.email;
    await this.userRepository.save(updatedUser);
    return updatedUser;
  }

  async delete(id: number): Promise<User> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return user;
  }
}
