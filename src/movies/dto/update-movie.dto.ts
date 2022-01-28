import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateMovieDTO } from './create-movie.dto';

export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {
  @IsString()
  readonly title?: string;

  @IsNumber()
  readonly year?: number;

  @IsOptional()
  @IsString({ each: true })
  readonly genres?: string[];
}
