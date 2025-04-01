import { Entity, Column, PrimaryGeneratedColumn, RelationId, ManyToOne, Unique } from "typeorm";
import { ShowtimeEntity } from "./showtimes.entity";

@Entity()
@Unique(["showtimeId", "seatNumber"])
export class BookingEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column({nullable: true})
  showtimeId: number

  @ManyToOne(() => ShowtimeEntity)
  showtime: ShowtimeEntity

  @Column({length: 256})
  userId: string

  @Column("int")
  seatNumber: number;
}
