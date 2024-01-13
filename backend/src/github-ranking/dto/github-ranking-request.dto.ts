import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { toLowerCase, toNumber, toDate } from '../../common/helper/cast.helper';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ParamDto {
  @Transform(({ value }) => toDate(value))
  @IsDate()
  @ApiProperty({ description: 'The date of the ranking. Ex: 2019-02-22' })
  public date: Date;

  @Transform(({ value }) => toLowerCase(value))
  @IsString()
  @ApiProperty({
    description: 'The programming language that you will filter by',
  })
  public language: string;
}

export class QueryDto {
  @Transform(({ value }) => toNumber(value, { default: 100, min: 1, max: 100 }))
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ description: 'The max amount of values to return' })
  public limit?: number;
}
