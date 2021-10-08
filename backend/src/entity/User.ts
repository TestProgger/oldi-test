import { IsEmail } from 'class-validator';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';
import { randomBytes } from 'crypto'

@Entity('users')
export class User{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type : 'string' , length : 64 ,})
    @IsEmail()
    email !: string 

    @Column( { type : 'string' , length : 255 } )
    password !: string

    @Column( { type : 'string' ,  length : 255 } )
    secret ?: string

    @Column( { type : 'string' } )
    profileImage ?: string

    @BeforeInsert()
    async hashPassword(){
        this.password = await hash( this.password , 10 );
    }

    @BeforeInsert()
    async genSecret(){
        this.secret =  randomBytes(64).toString('base64');
    }

}