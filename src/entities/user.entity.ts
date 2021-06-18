import {
  Entity,
  Column,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude, classToPlain } from 'class-transformer';
import { AbstractEntity } from './abstract-entity';
import { UserResponse } from 'src/models/user.model';

@Entity('users')
export class UserEntity extends AbstractEntity {

  @Column()
	username: string;
	
  @Column({ default: '自我介绍' })
  bio: string;
  
  @Column({ default: 'https://picsum.photos/100' })
  avatar: string;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  
  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  toJSON() {
    return <UserResponse['user']>classToPlain(this);
  }

}
