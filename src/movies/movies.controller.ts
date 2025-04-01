import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { MovieService } from './movies.service';
import { AddMovieDTO, UpdateMovieDTO } from './dto/movies.dto';
import { IMovie } from './interfaces/movies.interfaces';


@Controller("movies")
export class MovieController {
  constructor(private readonly service: MovieService) {}

  @Get("all")
  getAll(): Promise<IMovie[]> {
    return this.service.getAll();
  }

  @Post()
  addMovie(@Body() movie: AddMovieDTO): IMovie {
    return this.service.create(movie);
  }
  
  @Post("update/:title")
  updateMovie(@Param("title") title: string,
              @Body() movie: UpdateMovieDTO): void {
    this.service.update(title, movie);
  }

  @Delete(":title")
  async deleteMovie(@Param("title") title: string): Promise<void> {
    return this.service.delete(title);
  }
}
