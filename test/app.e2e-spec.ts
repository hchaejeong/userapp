import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();  //creating an application for each test
    app.useGlobalPipes(new ValidationPipe( {
      whitelist: true,
      forbidNonWhitelisted: true, //들어오면 안되면 정보 아예 차단
      transform: true,
    }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to User API');
  });
  
  describe('/user', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/user')
        .expect(200)  //status code 200: working fine
        .expect([]);
    });
    it('POST 201', () => {
      return request(app.getHttpServer())
      .post('/user')
      .send({
        name : 'hyun',
        age: 21,
        companies: ['tain'],
      })
      .expect(201); //status code 201: working fine for POST
    })
    it('POST 400', () => {
      return request(app.getHttpServer())
      .post('/user')
      .send({
        name : 'hyun',
        age: 21,
        companies: ['tain'],
        other: 'thing',     //있으면 안되는 항목이여서 400 status code가 나와야한다
      })
      .expect(400); //status code 201: working fine for POST
    })
  })
  
  describe('/user/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/user/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/user/90').expect(404);
    });
    it('PATCH', () => {
      return request(app.getHttpServer()).patch('/user/1').send({name:'cindy'}).expect(200);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/user/1').expect(200);
    });
  })

});
