export class User{
    userId: string
    constructor(userId: string){
        this.userId = userId //Math.random()
    }
}

// import {Entity, PrimaryGeneratedColumn} from "typeorm"; 

// @Entity()
// export class User{
//         @PrimaryGeneratedColumn()
//         userId!: string
// }