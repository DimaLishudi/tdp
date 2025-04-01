import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 256 })
  title: string;
  
  @Column({ length: 256 })
  genre: string;
  
  @Column("int")
  duration: number

  @Column("float")
  rating: number;

  @Column("int")
  releaseYear: number;
}
