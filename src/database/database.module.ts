import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/modules/categories/entities/category';
import { Invoice } from 'src/modules/invoices/entities/invoice';
import { User } from 'src/modules/users/entities/user';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      name: 'default',
      useFactory: () => ({
        type: 'mysql',
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        synchronize: true,
        entities: [User, Invoice, Category],
        migrations: [],
        migrationsRun: true,
        logging: true,
      }),
      inject: [],
    }),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export default class DatabaseModule {}
