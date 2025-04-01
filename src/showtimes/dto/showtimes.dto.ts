// we use classes instead of interfaces here as recommended in documentation

export class AddShowtimeDTO {
    movieId!: number;
    price!: number;
    theater!: string;
    startTime!: Date;
    endTime!: Date;
}

export class UpdateShowtimeDTO {
    movieId?: number;
    price?: number;
    theater?: string;
    startTime?: Date;
    endTime?: Date;
}
