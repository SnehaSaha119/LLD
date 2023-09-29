import { Booking } from "./booking"
import { Floor } from "./floor"

export class Conference{
    conferenceRoomId: string = ''
    //capacity: number = 0
    bookedSlot: { [key: string] : string } = {} //list of free slot or list of booked slots or dic for date and slot
    floorId: string = ''
    buildingId: string = ''

    // constructor(
    //     conferenceRoomId: string, 
    //     capacity: number,
    //     bookedSlot: { [key: string] : string },
    //     floorId:string,
    //     buildingId: string
    //     ){
        
    //     this.conferenceRoomId = conferenceRoomId
    //     this.capacity = capacity
    //     this.bookedSlot = bookedSlot
    //     this.floorId = floorId
    //     this.buildingId = buildingId
    // }
}