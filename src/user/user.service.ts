import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create({ userDetails }) {
    return await this.userRepository.create(userDetails);
  }

  async findUser({ userDetails }) {
    return await this.userRepository.findOne(userDetails);
  }
}
