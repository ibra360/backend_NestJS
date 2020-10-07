import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    ProductModule,
    AuthModule,
    MulterModule.register({
      dest: './files',
    }),
    MongooseModule.forRoot(
      'mongodb+srv://abd:abd123@bismillah.f5fdy.mongodb.net/nest2?retryWrites=true&w=majority',
      // { useUnifiedTopology: true, useNewUrlParser: true },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
