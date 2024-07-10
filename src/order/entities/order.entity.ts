import { User } from "src/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { OrderStatus } from "../enum/enum.status";
import { Shipping } from "./shipping.entity";
import { OrdersProducts } from "./orders-products.entity";
import { Product } from "src/product/entities/product.entity";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    orderAt: Timestamp

    @Column({type: 'enum', enum: OrderStatus, default: OrderStatus.PROCESSING})
    status: string

    @Column({nullable: true})
    shippedAt: Date

    @Column({nullable: true})
    deliveredAt: Date

    @ManyToOne(()=> User, user=> user.order)
    user: User

    @OneToOne(()=> Shipping, ship=> ship.order, {cascade: true})
    @JoinColumn()
    shippingAddress: Shipping

    @OneToMany(() => Product, product =>  product.order)
    products: Product[]

    @OneToMany(()=> OrdersProducts, op=> op.order, {cascade: true})
    order_product: OrdersProducts[]
}
