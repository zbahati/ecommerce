import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrdersProducts } from './entities/orders-products.entity';
import { Shipping } from './entities/shipping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrdersProducts,Shipping ])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
