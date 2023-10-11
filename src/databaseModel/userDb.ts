import {Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm"; 

@Entity({name: 'user_db'})
export class UserDb{
    @PrimaryColumn()
    userId!: string
}