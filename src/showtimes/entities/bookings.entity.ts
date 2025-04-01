import { Entity, Column, PrimaryGeneratedColumn, RelationId } from "typeorm";

@Entity()
export class BookingEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column("int")
  showtimeId: number

  @Column({length: 256})
  userId: string

  @Column("int")
  seatNumber: number;
}
