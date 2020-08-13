import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello ..!..!';
  }

  countUsers(): number {

    return 0;
  }

}
