import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/countries.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    CountriesModule,
  ],
})
export class AppModule {}
