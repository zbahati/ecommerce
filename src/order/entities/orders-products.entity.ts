import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "src/product/entities/product.entity";

@Entity('orders-products')
export class OrdersProducts{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({type: 'decimal', precision: 10, scale: 2, default: 0})
    product_unit_price: number

    @Column()
    product_quantity: number

    @ManyToOne(()=> Order, order=> order.order_product)
    order: Order

    @ManyToOne(()=> Product, product=> product.order_product)
    product: Product


}