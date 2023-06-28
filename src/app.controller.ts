import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
    @Get()
    mainPage() {
        return 'Welcome to User API';
    }
}
