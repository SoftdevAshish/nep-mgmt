import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({example: '9843065157'})
    contactNumber: string;
  
    @ApiProperty({example:'Jack.brown@lanyap.com'})
    email: string;

    @ApiProperty()
    isActive:boolean;

    @ApiProperty({example:'[1]'})
    role:string[];

}
