import { Test, TestingModule } from "@nestjs/testing";
import { ShowtimeController } from "./showtimes.controller";
import { ShowtimeService } from "./showtimes.service";
import { AddShowtimeDTO, UpdateShowtimeDTO } from "./dto/showtimes.dto";
import { IShowtime } from "./interfaces/showtimes.interfaces";


function makeNumberedShowtime(num: number): IShowtime {
  const start = new Date();
  start.setUTCDate(start.getUTCDate() + 100 * num);
  const end = new Date();
  end.setUTCDate(start.getUTCDate() + 1);

  return {
      id: num,
      movieId: num,
      price: 100 * num,
      theater: `theater ${num}`,
      startTime: start,
      endTime: end,
  }
}

describe("ShowtimesController", () => {
  let controller: ShowtimeController;
  let service: ShowtimeService;

  const numShowtimes = 5;
  const allShowtimes: IShowtime[] = Array.from(Array(numShowtimes).keys()).map(makeNumberedShowtime);
  const exampleShowtime = makeNumberedShowtime(11);
  const addShowtimeDTO: AddShowtimeDTO = makeNumberedShowtime(numShowtimes + 10);
  const updateShowtimeDTO: UpdateShowtimeDTO = {
    price: 0.01,
    theater: "custom theater",
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ShowtimeController],
      providers: [
        ShowtimeService,
        {
          provide: ShowtimeService,
          useValue: {
            getById: jest.fn().mockResolvedValue((id: number) =>
                Promise.resolve(allShowtimes[id])
            ),
            create: jest.fn().mockImplementation((_: AddShowtimeDTO) =>
                Promise.resolve(exampleShowtime),
            ),
            update: jest.fn().mockImplementation((id, showtime: UpdateShowtimeDTO) =>
                Promise.resolve({...exampleShowtime, ...showtime}),
            ),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();


    controller = app.get(ShowtimeController);
    service = app.get(ShowtimeService);
  });

  describe("getById()", () => {
    it.each(Array(numShowtimes))("should return corresponding showtime", async (id) => {
      expect(controller.get(id)).resolves.toEqual(allShowtimes[id]);
      expect(service.getById).toHaveBeenCalledWith(id);
    });
  });

  describe("create()", () => {
    it("should call create", () => {
      expect(controller.addShowtime(addShowtimeDTO)).resolves.toEqual(exampleShowtime);
      expect(service.create).toHaveBeenCalledWith(addShowtimeDTO);
    });
  });

  describe("update()", () => {
    it("should call update", () => {
      const id = 999;
      controller.updateShowtime(999, updateShowtimeDTO);
      expect(service.update).toHaveBeenCalledWith(999, updateShowtimeDTO);
    });
  });

  describe("delete()", () => {
    it("should call delete", () => {
      const id = 999;
      controller.deleteShowtime(id);
      expect(service.delete).toHaveBeenCalledWith(id);
    });
  });
});
