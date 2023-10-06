import { bookingRepository } from "../config/storage";
import { BookingStatus } from "../enum/bookingStatus";
import { Booking } from "../model/booking";

export interface BookingServiceInterface {

    isBookingExists(slotTime: string,conferenceRoomId: string,floorId: string, buildingId: string): Boolean

    isSlotAvailable(slotTime: string,conferenceRoomId: string,floorId: string, buildingId: string): Boolean
    addBooking(userId: string, slotTime: string, conferenceRoomId: string,floorId: string,buildingId: string): Booking

    isBookingAlreadyCancelled(userId: string, slotTime: string,conferenceRoomId: string,floorId: string, buildingId: string): boolean 

    cancelBooking(userId: string, slotTime: string,conferenceRoomId: string,floorId: string,buildingId: string): Booking|undefined

    listBookingByUser(userId: string,floorId: string,buildingId: string) : Booking[]
}