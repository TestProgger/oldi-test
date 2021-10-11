import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('token_store')
export class TokenStore{

    @PrimaryGeneratedColumn()
    id !: number

    @Column('varchar')
    token !: string

    @Column('int')
    userId !: number

    @Column('int')
    expirationTime !: number

}