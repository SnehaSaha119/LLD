import { Building } from "./building"
import { Conference } from "./conference"

export class Floor{
    floorId: string = ''
    conferenceRooms : Conference[] = []
    buildingId: string = ''
    
    // constructor(
    //     floorId: string,
    //     conferenceRooms: Conference [],
    //     buildingId: string
    // ){

    //     this.floorId = floorId
    //     this.conferenceRooms = conferenceRooms
    //     this.buildingId = buildingId
    // }
}

// import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"; 

// @Entity()
// export class Floor{

//     @PrimaryGeneratedColumn()
//     floorId!: string

//     @OneToMany(()=>Conference,(conferenceRooms: Conference)=>conferenceRooms.conferenceRoomId)
//     conferenceRooms: Conference[] = []

//     @Column()
//     buildingId!: string
// }

