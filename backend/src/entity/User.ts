import { IsEmail } from 'class-validator';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from 'bcrypt';
import { randomBytes } from 'crypto'
import { v4 as uuidv4 } from 'uuid';
@Entity('users')
export class User{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar" , {nullable: true})
    uuid !: string
    
    @Column("varchar" , {length : 255})
    username !: string 

    @Column("varchar" , {length : 255})
    @IsEmail()
    email !: string 

    @Column( "varchar" , {length : 255} )
    password !: string

    @Column( "varchar" , { nullable : true} )
    secret ?: string

    @Column( "varchar" , { length : 255 , nullable : true } )
    profileImage ?: string

    
    @BeforeInsert()
    async hashPassword(){
        this.password = await hash( this.password , 10 );
    }

    @BeforeUpdate()
    async updatePassword(){
        this.password = await hash( this.password , 10 );
    }


    @BeforeInsert()
    async genSecret(){
        this.secret =  randomBytes(64).toString('base64');
    }



    @BeforeInsert()
    async getUUID(){
        this.uuid = uuidv4();
    }

}