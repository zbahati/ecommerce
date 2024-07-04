import { User } from "src/entity/user.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @CreateDateColumn()
    created_at: Timestamp
    
    @UpdateDateColumn()
    updated_at: Timestamp

    @ManyToOne(() => User, (user) => user.category)
    addedBy: User

    @OneToMany(()=> Product, (prod) => prod.category)
    product: Product[]

    constructor(entity: Partial<Category>){
        Object.assign(this, entity)
    }
    
}
