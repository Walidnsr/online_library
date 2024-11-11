import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserManagementService } from './user_management.service';
import { UserManagementController } from './user_management.controller';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'local' }),
  ],
  controllers: [UserManagementController],
  providers: [UserManagementService, LocalStrategy],
  exports: [UserManagementService],
})
export class UserManagementModule {}
