import { Body, Controller, Get, Headers, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Demo } from './dto/demo.type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/get-user/:id/:hoTen")
  getListUser(
    @Param("id") id,
    @Param("hoTen") hoTen,
    @Query("filter") filter,
    @Headers("token") token
  ): Demo {
    return this.appService.getListUser(+id, hoTen, filter, token);
  }

  @Post("/create-user")
  createUser(
    @Body() body
  ): any {
    return body;
  }
}
