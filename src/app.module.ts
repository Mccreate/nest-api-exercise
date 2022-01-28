import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
config();

console.log(process.env.MONGO_URL);
@Module({
  imports: [MoviesModule, MongooseModule.forRoot(process.env.MONGO_URL)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
