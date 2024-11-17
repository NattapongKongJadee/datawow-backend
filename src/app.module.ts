import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { PostsService } from './posts/posts.service';
import { PostsController } from './posts/posts.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_secret_key',
    }),
  ],
  controllers: [AppController, AuthController, PostsController],
  providers: [AppService, AuthService, PostsService],
})
export class AppModule {}
