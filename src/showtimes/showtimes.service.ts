import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ShowtimeEntity } from "./entities/showtimes.entity";
import { AddShowtimeDTO, UpdateShowtimeDTO } from "./dto/showtimes.dto";


@Injectable()
export class ShowtimeService {  
  constructor(
    @InjectRepository(ShowtimeEntity)
    private readonly repository: Repository<ShowtimeEntity>,
  ) {}

  getById(id: number): Promise<ShowtimeEntity[]> {
    return this.repository.findBy({id: id});
  }

  create(showtime: AddShowtimeDTO): ShowtimeEntity {
    return this.repository.create(showtime);
  }
  
  update(id: number, showtime: UpdateShowtimeDTO): void {
    this.repository.update({id: id}, showtime);
  }

  async delete(id: number): Promise<void> {
    const result = await this.repository.delete({id: id});
    if (result.affected == 0) {
      throw new HttpException("Not found", HttpStatus.NOT_FOUND)
    }
  }
}
