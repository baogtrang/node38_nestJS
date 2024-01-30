import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import loginDTO from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// khi import lib khác vào , import 2 bước
// B1: import module lib vào module đang code
// b2: import service lib vào service đang code

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ){}

  prisma = new PrismaClient();
  async login(body: loginDTO): Promise<any> {
    let {email, pass_word} = body;
    // B1: kiểm tra email có tồn tại trong DB hay không
    let checkUser = await this.prisma.users.findFirst({
      where: {
        email: email
      }
    })
    if (checkUser) {
      // nếu user tồn tại trong DB => check password
      let isCorrectPass = bcrypt.compareSync(pass_word, checkUser.pass_word);
      if(isCorrectPass) {
        let payload = {
          user_id: checkUser.user_id,
          email: checkUser.email,
          role: checkUser.role
        }
        // nếu password matching => tạo token
        let token = this.jwtService.sign(payload, {
          secret: this.configService.get("SECRET_KEY"),
          expiresIn: this.configService.get("EXPIRES_IN")
        })
        return token;
        // nếu không => raise lỗi
      }
      return "password incorrect"
    }
    return "User is not exist"
  }

  signUp() {
    return "signUp";
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
