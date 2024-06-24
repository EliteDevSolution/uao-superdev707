import { IsDate, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { Date } from 'mongoose';
export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  readonly start_date: string;

  @IsString()
  @IsNotEmpty()
  readonly end_date: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
}
