import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import config from '../config';

// ?módulos globales "@Global" se importarán automáticamente en todos los otros módulos de la aplicación, sin necesidad de importarlos explícitamente
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { username, database, host, password, port } =
          configService.postgres;
        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
