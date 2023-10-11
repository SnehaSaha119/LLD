import {Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm"; 
import { Floor } from "../model/floor";
import { Slot } from "../model/slot";
import { FloorDb } from "./floorDb";

@Entity({name: 'conference_db'})
export class ConferenceDb {
    @PrimaryColumn()
    conferenceRoomId!: string

    @ManyToOne(()=>FloorDb,(floor: FloorDb)=>floor.floorId)
    floorId!: string

    @Column()
    buildingId!: string
    
    @Column()
    capacity!: number
    
    @Column("jsonb",{nullable: true})
    bookedSlot!: Slot[]
}