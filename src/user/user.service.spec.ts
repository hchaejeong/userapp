/*
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common';

//unit testing (function단위로 테스트하는 방식)
describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //test create 
  describe("create", () => {
    it('should create an user', () => { //check if length of users increase by 1 by additional user created
      const userNumBefore = service.getAll().;
      service.create( {
        name: 'hyun',
        age: 21,
        companies: ['tain'],
      });
      const userNumAfter = service.getAll().length;
      expect(userNumAfter).toBeGreaterThan(userNumBefore);  //if statement처럼 조건이 만족되어 있는지 확인 후 pass/fail 판단 - userNumAfter > userNumBefore인 경우 pass
    })
  })

  //test read (get)
  describe("getAll", () => {
    it('should get all user info', () => {
      const users = service.getAll();
      expect(users).toBeInstanceOf(Array);  //user정보들 다 array로 표현이 된다
    })
  })

  //test read (get own user info)
  describe("getOwn", () => {
    it('should get its own user info', () => {
      service.create({
        name: 'hyun',
        age: 21,
        companies: ['tain'],
      }); //자기 정보 입력 - 이게 잘 찾을수 있는지를 확인
      const user = service.getOwn(1);
      expect(user).toBeDefined();     //방금 입력한 userid=1을 가진 유저가 존재하는지 확인
    })
  })

  //test update
  describe("update", () => {
    it('should update an user info', () => {
      service.create({
        name: 'hyun',
        age: 21,
        companies: ['tain'],
      });
      service.update(1, { name: 'cindy' }); //name을 변경사항으로 둠
      const updateUser = service.getOwn(1);
      expect(updateUser.name).toEqual('cindy'); //변경사항이 잘 반영됐는지 확인
    })
    //존재하지 않는 정보를 수정하려고 할때 에러를 호출해야됨
    it('should throw NotFoundException', () => {
      try {
        service.update(20, {});
      }
      catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);  //존재하지 않는 정보를 수정하려고 할때 제대로 에러 호출하는지 확인
      }
    })
  })

  //test delete
  describe("deleteUser", () => {
    it('should delete a specific user', () => {
      service.create({
        name: 'hyun',
        age: 21,
        companies: ['tain'],
      });
      const userNumBefore = service.getAll().length;
      service.deleteUser(1);
      const userNumAfter = service.getAll().length;
      
      expect(userNumBefore).toBeGreaterThan(userNumAfter);
    });
    //존재하지 않는 정보를 삭제하려고 할때 이 정보는 존재하지 않다는 에러를 호출해야됨
    it('should throw NotFoundException', () => {
      try {
        service.deleteUser(20);
      }
      catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);  //catch(e) 했다는 뜻은 에러 발생했다는거기 때문에 에러 발생 시 notfoundexception에러를 띄워라
      }
    })
  })

});
*/