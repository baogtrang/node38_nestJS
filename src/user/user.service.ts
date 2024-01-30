import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client'
import { initAvatar } from 'src/utils';

@Injectable()
export class UserService {
  prisma = new PrismaClient()

  async create(createUserDto: CreateUserDto): Promise<string>  {
    
    // lấy full name để tạo avatar
    let fullName = createUserDto.full_name;
    // split fullName
    // Nguyễn Văn A => ["Nguyễn", "Văn", "A"]
    
    let newAvatar = initAvatar(fullName);

    let newUser = {...createUserDto, face_app_id: "1234567", avatar: newAvatar};
    await this.prisma.users.create({
      data: newUser
    })
    return "Create successful"
  }

  async findAll(skip: number, numSize: number, filter: string): Promise<any> {
    // sequelize -> offset, limit
    // prisma -> take skip
    let data = await this.prisma.users.findMany({
      where: {
        full_name: {
          contains: filter
        }
      },
      skip: skip,
      take: numSize,
      include: {
        video_comment: true,
        video_like: true
      }
    });
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
