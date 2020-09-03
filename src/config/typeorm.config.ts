import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import {JwtModuleOptions} from "@nestjs/jwt";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'evNest',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true, // pri produkci neni doporucovano
};

