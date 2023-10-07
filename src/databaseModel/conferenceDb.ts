import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm"; 
import { Floor } from "../model/floor";
import { Slot } from "../model/slot";

@Entity()
export class ConferenceDb {
    @PrimaryGeneratedColumn()
    conferenceRoomId!: string

    @ManyToOne(()=>Floor,(floor: Floor)=>floor.floorId)
    floorId!: []

    @Column()
    buildingId!: string
    
    @Column()
    capacity!: number
    
    @Column()
    bookedSlot!: Slot[]
}