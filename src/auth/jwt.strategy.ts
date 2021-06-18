import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/entities/user.entity';
import { AuthPayload } from 'src/models/user.model';
import {secret} from './jwt.secret'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  async validate(payload: AuthPayload) {
    const { username } = payload;
    const user = await this.userRepo.find({ where: { username } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
