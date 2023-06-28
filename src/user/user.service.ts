import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create_user.dto';
import { UpdateUserDTO } from './dto/update_user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
    //private users: User[] = [];

    //user 생성하기 위한 function (create)
    create(userData : CreateUserDTO) {
        const createdUser = this.userRepository.create(userData);
        this.userRepository.save(createdUser);    //save을 이용해 바로 데이터베이스에 바로 정보 삽입 가능
        /*this.users.push({
            id: this.users.length + 1,
            ...userData,
        });
        */
    }

    //조회 하기 위한 메서드 (read)
    async getAll() : Promise<User[]> {
        return this.userRepository.find();
    }

    //자기 자신의 정보만 조회 (read)
    getOwn(userid: number): Promise<User> {
        const result = this.userRepository.findOneBy({id:userid});
        if (!result) {
            throw new HttpException("User with ${'id'} is not found.", HttpStatus.NOT_FOUND);
        }
        return result;
        
        
        /*
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException('User with ${id} is not found.');
        }
        return user;
        */
    }

    //유저 정보 수정 (update)
    async update(id: number, updateData: UpdateUserDTO): Promise<void> {
        await this.userRepository.update(id, {...updateData})
        /*
        let foundUser = await this.userRepository.findOneBy({id: id});
        if (!foundUser) {
            throw new HttpException('User with id ${id} is not found.', HttpStatus.NOT_FOUND);
        }
        foundUser = {...foundUser, ...updateData};
        await this.userRepository.save(foundUser);
        
        const userID = this.getOwn(id);   //이걸 통해 수정하고픈 유저 정보
        //원래 user정보를 폐기하고 새로운 정보로 다시 만드는 방식 사용
        this.deleteUser(id);
        this.users.push({...userID, ...updateData});    //수정하려고 하는 유저 아이디랑 수정본 정보를 users 배열에 추가하기 위해 .push사용한다
        */
    }

    //유저 한명 삭제 (delete)
    async deleteUser(id: number) {
        const result = await this.userRepository.delete(id)

        if (result.affected === 0) {
            throw new NotFoundException("User with id ${'id'} is not found.");
        }
        
        /*
        this.getOwn(id);
        this.users = this.users.filter(user => user.id !== id); //id와 같은 유저만 빼고 filtering 해준다 - 이 유저만 삭제하는거와 같게 된다
        */
    }
    
}
