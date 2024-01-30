import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule], // import cloudinary module để dùng
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
