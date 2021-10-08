import { IsEmail } from 'class-validator';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';
import { randomBytes } from 'crypto'

@Entity('users')
export class User{

    @PrimaryGeneratedColumn()
    id!: number;

    
    @Column("varchar" , {length : 255})
    username !: string 

    @Column("varchar" , {length : 255})
    @IsEmail()
    email !: string 

    @Column( "varchar" , {length : 255} )
    password !: string

    @Column( "varchar" , {length : 255} )
    secret ?: string

    @Column( "varchar" , { length : 255 } )
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