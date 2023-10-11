import {Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm"; 
import { Floor } from "../model/floor";
import { Slot } from "../model/slot";
import { BookingStatus } from "../enum/bookingStatus";
import { Conference } from "../model/conference";
import { ConferenceDb } from "./conferenceDb";

@Entity({name: 'booking_db'})
export class BookingDb {
    @PrimaryGeneratedColumn()
    bookingId!: string

    @Column()
    userId!: string

    @Column("simple-json")
    bookedSlot!: {startTime: number, endTime:number}

    @Column()
    bookingStatus!: BookingStatus
    
    @OneToOne(()=>ConferenceDb,(conference: ConferenceDb)=>conference.conferenceRoomId)
    conferenceRoomId!: string
}