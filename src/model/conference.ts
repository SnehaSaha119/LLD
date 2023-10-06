import { Booking } from "./booking"
import { Floor } from "./floor"
import { Slot } from "./slot"

export class Conference{
    conferenceRoomId: string = ''
    capacity: number = 0
    bookedSlots: Slot[] = []
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