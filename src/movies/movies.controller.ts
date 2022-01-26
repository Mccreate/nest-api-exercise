import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {
  }

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.moviesService.getOne(id);
  }

  @Post()
  create(@Body() movieData) {
    console.log(movieData);
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.moviesService.delete(id);
  }

  @Patch('/:id')
  patch(@Param('id') movieId: number, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }
}
