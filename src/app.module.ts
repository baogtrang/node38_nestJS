import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { loggerMiddleware } from './middleware/logger.middleware';
import { loggerMiddlewareTest } from './middleware/logger_test.middleware';
import { VideoController } from './video/video.controller';

// để sử dụng được các biến trong file .env thì mình phải
// import ConfigModule vào App Module
// lưu ý: sau khi cài thư viện nào đó
// sẽ có 2 thành phần: module và service. Module để import vào App module và sử dụng thư viện

@Module({
  imports: [VideoModule, UserModule, ConfigModule.forRoot({
    isGlobal: true
  }),
  ServeStaticModule.forRoot({
    rootPath: "./public"
  }),
  AuthModule
],
  controllers: [AppController], // rootRoutes
  providers: [AppService], // rootController
})
// DI : dependency injection
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//       consumer
//       .apply(loggerMiddleware)
//       .forRoutes(
//         { path: "/user/test/:id", method: RequestMethod.GET});
//       consumer.apply(loggerMiddlewareTest).forRoutes(VideoController);
//   }
// }
export class AppModule {}

// mô hình nest

// controller <==> routes của express
// module <==> ghép controller, service lại vs nhau để 2 module hiểu nhau, add thêm các module bên ngoài
// service <==> controller của express

// prisma
// npm i prisma @prisma/client
// yarn add prisma @prisma/client
// B1: npx prisma init
// B2: update connection string
// B3: npx prisma db pull
// B4: npx prisma generate => để tạo prisma client
