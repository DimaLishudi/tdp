import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, QueryRunner, Repository } from "typeorm";
import { ShowtimeEntity } from "./entities/showtimes.entity";
import { AddShowtimeDTO, UpdateShowtimeDTO } from "./dto/showtimes.dto";
import { IShowtime } from "./interfaces/showtimes.interfaces";


@Injectable()
export class ShowtimeService {  
  constructor(
    @InjectDataSource()
    private datasource: DataSource,
  ) {}

  
  private repository(): Repository<ShowtimeEntity> {
    return this.datasource.getRepository(ShowtimeEntity)
  }

  getById(id: number): Promise<ShowtimeEntity[]> {
    return this.repository().findBy({id: id});
  }

  private async checkIntersection(showtime: AddShowtimeDTO, queryRunner: QueryRunner): Promise<void> {
    const hasIntersection = this.datasource
      .getRepository(ShowtimeEntity)
      .createQueryBuilder("showtime", queryRunner)
      .where("showtime.theater = theater AND\
            ((showtime.startTime >= :start AND showtime.startTime <= :end) OR\
            (showtime.endTime   >= :start AND showtime.endTime   <= :end))",
              showtime)
      .getExists();
    if (hasIntersection) {
      throw new HttpException("Showtime intersects with another", HttpStatus.BAD_REQUEST)
    }
  }

  async create(showtime: AddShowtimeDTO): Promise<IShowtime> {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction("SERIALIZABLE");

    
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.checkIntersection(showtime, queryRunner);

      const res = queryRunner.manager.create(ShowtimeEntity, showtime);
      await queryRunner.commitTransaction();
      return res;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
  
  async update(id: number, showtime: UpdateShowtimeDTO): Promise<void> {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction("SERIALIZABLE");

    
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const oldShowtime = await queryRunner.manager
        .getRepository(ShowtimeEntity)
        .findOneBy({id: id});

      const updatedShowtime = {...oldShowtime, ...showtime};

      await this.checkIntersection(updatedShowtime, queryRunner);
      await queryRunner.manager.update(ShowtimeEntity, { where: {id: id} }, showtime);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.repository().delete({id: id});
    if (result.affected == 0) {
      throw new HttpException("Not found", HttpStatus.NOT_FOUND)
    }
  }
}
