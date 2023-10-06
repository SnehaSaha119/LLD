import { Floor } from "./floor"

export class Building {
    buildingId: string = ''
    floors: Floor [] = []

    //During interview mention buildingname, buildingDetails, etc as metadata of buidling class
}

// import {Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"; 

// @Entity()
// export class Building {
//     @PrimaryGeneratedColumn()
//     buildingId!: string

//     @OneToMany(() => Floor, (floor: Floor) => floor.floorId)
//     floor!: Floor[]
// }