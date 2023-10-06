import { Conference } from "./conference"

export class Floor{
    floorId: string = ''
    conference : Conference[] = []
    buildingId: string = ''
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

