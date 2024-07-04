import { User } from "src/entity/user.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    ratings: number

    @Column()
    comments: String

    @CreateDateColumn()
    created_at: Timestamp

    @UpdateDateColumn()
    updated_at: Timestamp

    @ManyToOne(()=> Product, prod=> prod.reviews)
    product: Product

    @ManyToOne(()=> User, user=> user.reviews)
    user: User

}
