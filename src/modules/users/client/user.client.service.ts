import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserAppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly User_Repository: Repository<UserEntity>,
  ) {}

  //For exports
  public async CreateUser(mobile: string, invite_code: string) {
    const user = await this.User_Repository.findOneBy({ mobile });

    if (user)
      throw new ConflictException('There is another acount with this mobile');

    const newUser = this.User_Repository.create({ mobile, invite_code });

    return await this.User_Repository.save(newUser);
  }

  public async findUserByMobile(mobile: string) {
    return await this.User_Repository.findOne({ where: { mobile } });
  }

  public async getUserByInviteCode(inviteCode: string) {
    return await this.User_Repository.findOne({
      where: { invite_code: inviteCode },
    });
  }
}
