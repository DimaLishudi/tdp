import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieModule } from "./movies/movies.module";
import { ShowtimeModule } from "./showtimes/showtimes.module";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("POSTGRES_HOST"),
        port: +configService.get("POSTGRES_PORT"),
        username: configService.get("POSTGRES_USER"),
        password: configService.get("POSTGRES_PASSWORD"),
        database: configService.get("POSTGRES_DB"),
        synchronize: configService.get("NODE_ENV") == "development",
      }),
      inject: [ConfigService],
    }),
    // TypeOrmModule.forRootAsync({
    //   type: "postgres",
    //   host: "127.0.0.1",
    //   port: 3306,
    //   username: "root",
    //   password: "root",
    //   database: "test",
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    MovieModule,
    ShowtimeModule,
  ],
})
export class AppModule {}
