import { Test, TestingModule } from "@nestjs/testing";
import { MovieController } from "./movies.controller";
import { MovieService } from "./movies.service";
import { AddMovieDTO, UpdateMovieDTO } from "./dto/movies.dto";
import { IMovie } from "./interfaces/movies.interfaces";


function makeNumberedMovie(num: number): IMovie {
    return {
        id: num,
        title: `title #${num}`,
        genre: `genre ${num}`,
        duration: 90 + num,
        rating: 1 + num,
        releaseYear: 2000 + num,
    }
}

describe("MoviesController", () => {
  let controller: MovieController;
  let service: MovieService;

  const numMovies = 5;
  const allMovies: IMovie[] = Array.from(Array(numMovies).keys()).map(makeNumberedMovie);
  const exampleMovie = makeNumberedMovie(11);
  const addMovieDTO: AddMovieDTO = makeNumberedMovie(numMovies + 10);
  const updateMovieDTO: UpdateMovieDTO = {
    title: "changed title",
    rating: -1,
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        MovieService,
        {
          provide: MovieService,
          useValue: {
            getAll: jest.fn().mockResolvedValue(allMovies),
            create: jest.fn().mockImplementation((_: AddMovieDTO) =>
                Promise.resolve(exampleMovie),
            ),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();


    controller = app.get(MovieController);
    service = app.get(MovieService);
  });

  describe("getAll()", () => {
    it("should return an array of movies", async () => {
      expect(controller.getAll()).resolves.toEqual(allMovies);
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  describe("create()", () => {
    it("should call create", () => {
      expect(controller.addMovie(addMovieDTO)).resolves.toEqual(exampleMovie);
      expect(service.create).toHaveBeenCalledWith(addMovieDTO);
    });
  });

  describe("update()", () => {
    it("should call update", () => {
      const title = "test_title";
      controller.updateMovie(title, updateMovieDTO);
      expect(service.update).toHaveBeenCalledWith(title, updateMovieDTO);
    });
  });

  describe("delete()", () => {
    it("should call delete", () => {
      const title = "test_title";
      controller.deleteMovie(title);
      expect(service.delete).toHaveBeenCalledWith(title);
    });
  });
});
