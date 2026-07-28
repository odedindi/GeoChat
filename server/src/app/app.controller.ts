import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  health() {
    return { status: 'ok', name: 'geochat-server', version: '0.1.0' };
  }
}
