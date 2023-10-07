import { BookingStatus } from "../enum/bookingStatus"
import { Conference } from "./conference"
import { Slot } from "./slot"

export class Booking {
    bookingId: string = ''
    bookingStatus: BookingStatus = BookingStatus.ACTIVE
    userId: string = ''
    slotTime: Slot = new Slot
    conferenceRoom: Conference = new Conference()
}