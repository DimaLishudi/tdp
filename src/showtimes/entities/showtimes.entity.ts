import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { MovieEntity } from "../../movies/entities/movies.entity";

@Entity()
export class ShowtimeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  

  @Column({nullable: true})
  movieId: number

  @ManyToOne(() => MovieEntity, movie => movie.id)
  movie: MovieEntity

  @Column("float")
  price: number

  @Column("string")
  theater: string

  @Column("datetime")
  startTime: Date

  @Column("datetime")
  endTime: Date
}
