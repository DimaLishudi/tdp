// we use classes instead of interfaces here as recommended in documentation

export class AddMovieDTO {
    title!: string;
    genre!: string;
    duration!: number;
    rating!: number;
    releaseYear!: number;
}

export class UpdateMovieDTO {
    title?: string;
    genre?: string;
    duration?: number;
    rating?: number;
    releaseYear?: number;
}
