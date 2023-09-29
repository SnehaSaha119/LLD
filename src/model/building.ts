import { Floor } from "./floor"

export class Building {
    buildingId: string = ''
    floors: Floor [] = []

    // constructor(
    //     buildingId:string,
    //     floors: Floor[]){

    //     this.buildingId = buildingId,
    //     this.floors = floors
    // }
}

// import {Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"; 

// @Entity()
// export class Building {
//     @PrimaryGeneratedColumn()
//     buildingId!: string

//     @OneToMany(() => Floor, (floor: Floor) => floor.floorId)
//     floor!: Floor[]
// }