import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {
  }

  @Get()
  async getAll(): Promise<Movie[]> {
    return await this.moviesService.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<Movie> {
    return await this.moviesService.getOne(id);
  }

  @Post()
  async create(@Body() movieData: CreateMovieDTO) {
    return await this.moviesService.create(movieData);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return await this.moviesService.deleteOne(id);
  }

  @Delete()
  async removeAll(): Promise<boolean> {
    return await this.moviesService.deleteAll();
  }

  @Patch('/:id')
  async patch(
    @Param('id') movieId: number,
    @Body() updateData: UpdateMovieDTO,
  ) {
    return await this.moviesService.update(movieId, updateData);
  }
}
