import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Roles } from "./role.enum";
import { Category } from "src/category/entities/category.entity";
import { Product } from "src/product/entities/product.entity";
import { Review } from "src/review/entities/review.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column({type: 'enum', enum: Roles, array: true, default: [Roles.USER]})
    roles: Roles[]

    @OneToMany(()=> Category, (cat) => cat.addedBy)
    category: Category[]

    @OneToMany(()=> Product, (product) => product.addedBy)
    product: Product[]
    @OneToMany(()=> Review, review=> review.user)
    reviews: Review[]

    constructor(entity: Partial<User>){
        Object.assign(this, entity)
    }
}

