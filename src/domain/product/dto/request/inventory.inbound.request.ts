import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class InventoryInboundRequest {
  @ApiProperty( {example: 100} )
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty( {example: "2023-12-31"} )
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  expiryDate: Date;

  @ApiProperty( {example: 1} )
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ example: "입고 사유" })
  @IsString()
  @IsNotEmpty()
  reason: string;
}
