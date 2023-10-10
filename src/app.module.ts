import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import DatabaseModule from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    InvoicesModule,
    DatabaseModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
