import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieModule } from "./movies/movies.module";
import { ShowtimeModule } from "./showtimes/showtimes.module";

// TODO: config
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "127.0.0.1",
      port: 3306,
      username: "root",
      password: "root",
      database: "test",
      autoLoadEntities: true,
      synchronize: true,
    }),
    MovieModule,
    ShowtimeModule,
  ],
})
export class AppModule {}
