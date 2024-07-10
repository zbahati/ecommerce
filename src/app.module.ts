import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtSecret } from './constants';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtSecret.JWT_SECRET,
      signOptions: {
        expiresIn: '1d'
      }
    }),
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      port: configService.getOrThrow('PORT'),
      username: configService.getOrThrow('USER'),
      password: configService.getOrThrow('PASSWORD'),
      database: configService.getOrThrow('DB'),
      autoLoadEntities: true,
      synchronize: true
    }),
    inject: [ConfigService]
  }),
    UserModule,
    CategoryModule,
    ProductModule,
    ReviewModule,
    OrderModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
