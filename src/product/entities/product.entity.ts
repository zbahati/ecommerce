import { Category } from "src/category/entities/category.entity";
import { User } from "src/entity/user.entity";
import { Review } from "src/review/entities/review.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: string

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0})
    price: number

    @Column()
    stock: number

    @Column('simple-array')
    images: string[]

    @CreateDateColumn()
    created_at: Timestamp

    @UpdateDateColumn()
    updated_at: Timestamp

    @ManyToOne(()=> User, (user)=> user.product)
    addedBy: User

    @OneToMany(()=>Review, review=> review.product)
    reviews: Review[]

    @ManyToOne(()=> Category, (cat)=> cat.product)
    category: Category

    constructor(entity: Partial<Product>){
        Object.assign(this, entity)
    }
}
