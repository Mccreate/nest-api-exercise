import { Injectable, NotFoundException } from '@nestjs/common';
//import { Movie } from './entities/movie.entity';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './schema/movie.schema';
import { CreateMovieDTO } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {
  }

  async getAll(): Promise<Movie[]> {
    try {
      return await this.movieModel.find().exec();
    } catch (err) {
      console.log('err');
    }
  }

  async getOne(id: number): Promise<Movie> {
    // const movie = this.movies.find((movie) => movie.id === +id);
    // if (!movie) {
    //   throw new NotFoundException(`Movie with Id ${id} not found.`);
    // }
    // return movie;
    try {
      const result = await this.movieModel.findOne({ id }).lean();
      if (!result) {
        throw new NotFoundException(`Movie ${id} is not found.`);
      }
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteOne(id: number): Promise<boolean> {
    // this.getOne(id);
    // this.movies = this.movies.filter((movie) => movie.id !== +id);
    // return true;
    try {
      await this.movieModel.deleteOne({ id }).exec();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async deleteAll(): Promise<boolean> {
    try {
      await this.movieModel.deleteMany({}).exec();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async create(createMovieDTO: CreateMovieDTO): Promise<Movie> {
    // this.movies.push({
    //   id: this.movies.length + 1,
    //   ...movieData,
    // });
    try {
      const createdMovie = new this.movieModel(createMovieDTO);
      return createdMovie.save();
    } catch (err) {
      console.log(err);
    }
  }

  async update(id: number, updateData: UpdateMovieDTO) {
    // const movie = this.getOne(id);
    // this.deleteOne(id);
    // this.movies.push({ ...movie, ...updateData });
    try {
      await this.movieModel.updateOne({ id }, updateData);
    } catch (err) {
      console.log(err);
    }
  }
}
