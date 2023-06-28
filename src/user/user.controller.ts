import { Controller, Get, Param, Post, Body, Delete, Patch, ValidationPipe, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create_user.dto';
import { UpdateUserDTO } from './dto/update_user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService)  {}  //이걸 통해 service의 메서드와 functionality 다 사용할 수 있게 한다

    @Post() //유저 생성 (CREATE)
    async createUser(@Body() createData: CreateUserDTO) {
        await this.userService.create(createData);
    }

    @Get() //조회 (READ)
    async getAll(): Promise<User[]> { //User들의 정보를 다 리턴받게 된다
        return this.userService.getAll();
    }

    @Get(':id') //url에서 /뒤에 입력한 숫자가 id가 되는거다
    getOwn(@Param("id") userId : number) : Promise<User> {   //User entity를 리턴하게 된다
        return this.userService.getOwn(userId);     
    }

    @Patch(':id')   //url뒤에 입력한 id를 가진 특정 유저정보 수정 (UPDATE)
    @UsePipes(ValidationPipe)
    updateUser(@Param("id") userId: number, @Body() updateData: UpdateUserDTO) {
        this.userService.update(userId, updateData);
    }

    @Delete(':id')  //url뒤에 입력한 id를 가진 유저 삭제 (DELETE)
    async deleteUser(@Param("id") userId: number) {
        this.userService.deleteUser(userId);
    }
}
