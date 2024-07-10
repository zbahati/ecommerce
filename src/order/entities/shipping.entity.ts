import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity("shippings")
export class Shipping{
    @PrimaryGeneratedColumn()
    id: number

    @Column({default: " "})
    name: string

    @Column()
    phone: string

    @Column()
    country: string

    @Column()
    city: string

    @Column()
    state: string

    @OneToOne(()=> Order, order=> order.shippingAddress)
    order: Order
}