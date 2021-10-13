import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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