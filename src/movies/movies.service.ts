import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
// import { IMovie } from "./interfaces/movies.interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MovieEntity } from "./movies.entity";
import { AddMovieDTO, UpdateMovieDTO } from "./dto/movies.dto";


@Injectable()
export class MovieService {  
  constructor(
    @InjectRepository(MovieEntity)
    private readonly repository: Repository<MovieEntity>,
  ) {}

  getAll(): Promise<MovieEntity[]> {
    return this.repository.find();
  }

  create(movie: AddMovieDTO): MovieEntity {
    // const movie = new MovieEntity(AddMovieDTO...)
    return this.repository.create(movie);
  }
  
  update(title: string, movie: UpdateMovieDTO): void {
    this.repository.update({title: title}, movie);
  }

  async delete(title: string): Promise<void> {
    const result = await this.repository.delete({title: title});
    if (result.affected == 0) {
      throw new HttpException("Not found", HttpStatus.NOT_FOUND)
    }
  }
}
