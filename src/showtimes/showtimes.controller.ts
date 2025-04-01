import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ShowtimeService } from './showtimes.service';
import { AddShowtimeDTO, UpdateShowtimeDTO } from './dto/showtimes.dto';
// import { Showtime } from './interfaces/showtimes.interfaces';


@Controller("showtimes")
export class ShowtimeController {
  constructor(private readonly service: ShowtimeService) {}

  @Get()
  get(@Param("title") id: number) {
    return this.service.getById(id);
  }

  // todo: return type
  @Post()
  addShowtime(@Body() showtime: AddShowtimeDTO) {
    return this.service.add(showtime);
  }
  
  @Post("update/:id")
  updateShowtime(@Param("id") id: string,
                 @Body() showtime: UpdateShowtimeDTO): void {
    this.service.update(id, showtime);
  }

  @Delete(":id")
  deleteShowtime(@Param("id") id: string): void {
    this.service.delete(id);
  }
}
