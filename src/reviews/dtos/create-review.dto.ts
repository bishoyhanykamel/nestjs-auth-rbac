import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
  @IsNotEmpty()
  @IsInt()
  bookId: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  @Max(5)
  @Min(1)
  rating: number;
}