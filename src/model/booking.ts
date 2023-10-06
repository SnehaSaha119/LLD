import { BookingStatus } from "../enum/bookingStatus"
import { Conference } from "./conference"
import { Slot } from "./slot"

export class Booking {
    bookingId: string = ''
    bookingStatus: BookingStatus = BookingStatus.ACTIVE
    userId: string = ''
    slotTime: Slot = new Slot
    conferenceRoom: Conference = new Conference()

    // constructor(
    //     bookingId: string,
    //     bookingStatus: BookingStatus,
    //     userId: string,
    //     slotTime: string,
    //     conferenceRoom: Conference
        
    //     ){
        
    //     this.bookingId = bookingId
    //     this.bookingStatus = bookingStatus
    //     this.slotTime = slotTime
    //     this.userId = userId
    //     this.conferenceRoom = conferenceRoom
    //}
}