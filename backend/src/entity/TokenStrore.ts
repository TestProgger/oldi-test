import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('token_store')
export class TokenStore{

    @PrimaryGeneratedColumn()
    id !: number

    @Column('varchar')
    token !: string

    @OneToOne(() => User)
    user !: User

    @Column('int')
    expirationTime !: number

}