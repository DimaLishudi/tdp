import { Entity, Column, PrimaryGeneratedColumn, RelationId } from "typeorm";

@Entity()
export class ShowtimeEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column("int")
  movieId: number

  @Column("float")
  price: number

  @Column("string")
  theater: string

  @Column("datetime")
  startTime: Date

  @Column("datetime")
  endTime: Date
}
