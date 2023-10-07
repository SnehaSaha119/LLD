import {Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm"; 
import { Floor } from "../model/floor";
import { Slot } from "../model/slot";
import { BookingStatus } from "../enum/bookingStatus";
import { Conference } from "../model/conference";

@Entity()
export class BookingDb {
    @PrimaryGeneratedColumn()
    bookingId!: string

    @ManyToOne(()=>Floor,(floor: Floor)=>floor.floorId)
    floorId!: []

    @Column()
    userId!: string

    @Column()
    bookedSlot!: Slot[]

    @Column()
    bookingStatus!: BookingStatus
    
    @OneToOne(()=>Conference,(conference: Conference)=>conference.conferenceRoomId)
    conferenceRoomId!: string
}