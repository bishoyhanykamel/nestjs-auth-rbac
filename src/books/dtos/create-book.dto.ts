import { IsOptional, IsString } from "class-validator";

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  @IsOptional()
  description?: string;
}