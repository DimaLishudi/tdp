import { Test, TestingModule } from "@nestjs/testing";
import { BookingController } from "./bookings.controller";
import { BookingService } from "./bookings.service";
import { AddBookingDTO } from "./dto/bookings.dto";


function makeNumberedBooking(num: number): AddBookingDTO {
  return {
    showtimeId: 100 + num,
    seatNumber: num,
    userId: (200 + num).toString(),
  }
}

describe("BookingController", () => {
  let controller: BookingController;
  let service: BookingService;

  const numBookings = 5;
  const bookings: AddBookingDTO[] = Array.from(Array(numBookings).keys()).map(makeNumberedBooking);

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        BookingService,
        {
          provide: BookingService,
          useValue: {
            add: jest.fn().mockImplementation((arg: AddBookingDTO) =>
                Promise.resolve( { bookingId: arg.userId } ),
            ),
          },
        },
      ],
    }).compile();

    controller = app.get(BookingController);
    service = app.get(BookingService);
  });

  describe("getById()", () => {
    it.each(bookings)("should return an array of bookings", async (addBookingDto) => {
      expect(controller.addBooking(addBookingDto)).resolves.toMatchObject({ bookingId: addBookingDto.userId });
      expect(service.add).toHaveBeenCalledWith(addBookingDto);
    });
  });
});
