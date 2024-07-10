import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersProducts } from './entities/orders-products.entity';
import { Shipping } from './entities/shipping.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrdersProducts)
    private readonly orderproductRepository: Repository<OrdersProducts>
  ) { }

  async create(createOrderDto: CreateOrderDto, user: any) {
    const shipping = new Shipping()
    Object.assign(shipping, createOrderDto.shippingAddress)
    const orderEntitity = new Order()
    orderEntitity.shippingAddress = shipping
    orderEntitity.user = user

    const order = await this.orderRepository.save(orderEntitity)
    let opEntity: {
      orderId: number,
      productId: number,
      product_quantity: number,
      product_unity_price: number
    }[] = []

    for (let i = 0; i < createOrderDto.order_product.length; i++) {
      const orderId = order.id;
      const productId = createOrderDto.order_product[i].id
      const product_quantity = createOrderDto.order_product[i].product_quantity
      const product_unity_price = createOrderDto.order_product[i].product_unit_price
      opEntity.push({
          orderId, productId, product_quantity, product_unity_price
        })
      }
      const op = await this.orderproductRepository
      .createQueryBuilder()
      .insert()
      .into(OrdersProducts)
      .values(opEntity)
      .execute();


       return await this.findOne(order.id)
  }

  findAll() {
    return `This action returns all order`;
  }

  async findOne(id: number) {
    return await this.orderRepository.findOne({
      where: {
        id: id
      }, 
      relations: {
        shippingAddress: true,
        user: true,
         products: true
      }
    })
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
