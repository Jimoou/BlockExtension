import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileExtensionModule } from './module/file.extension.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.RDS_HOST,
      port: 3306,
      username: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      database: process.env.RDS_DATABASE,
      autoLoadEntities: true,
      synchronize: false,
    }),
    FileExtensionModule,
  ],
})
export class AppModule {}
