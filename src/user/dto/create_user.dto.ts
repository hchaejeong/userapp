import { IsNotEmpty, IsString, IsNumber, IsOptional, MaxLength, MinLength, Max, Min } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString({ message: 'name must be a text' })
    @MaxLength(50)
    @MinLength(3)
    readonly name : string;

    @IsNotEmpty()
    @IsNumber()
    @Max(99999)
    @Min(0)
    readonly age : number;

    @IsOptional()
    @IsString()
    readonly companies : string;
}