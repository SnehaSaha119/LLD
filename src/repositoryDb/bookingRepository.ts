import { BookingStatus } from "../enum/bookingStatus"
import { Booking } from "../model/booking"

export class BookingRepository{
    private bookings: Booking [] = []

    addBooking(userId: string,slotTime:string,conferenceRoomId: string,floorId: string,buildingId: string): Booking{
        try{
            let slotTimeNo = slotTime.split('-').map((value)=>Number(value))
            let booking = new Booking()
            booking.bookingId = 'B' + Math.random()
            booking.conferenceRoom.conferenceRoomId = conferenceRoomId
            booking.conferenceRoom.floorId = floorId
            booking.conferenceRoom.buildingId = buildingId
            booking.slotTime.startTime = slotTimeNo[0]
            booking.slotTime.endTime = slotTimeNo[1]
            booking.userId = userId
            this.bookings.push(booking)
            console.log('BookingRepository | Successfully added booking')
            return booking
        }catch(error){
            console.error('BookingRepository | Error | While adding booking')
            throw error
        }
    }

    cancelBooking(userId: string,slotTime:string,conferenceRoomId: string,floorId: string,buildingId: string,bookingId: string): Booking|undefined{
        try{
            let slotTimeNo = slotTime.split('-').map((value)=>Number(value))
            let bookingUpdated;
            this.bookings.forEach((booking)=>{
                if(booking.bookingId == bookingId && booking.userId == userId && booking.slotTime.startTime == slotTimeNo[0] && booking.slotTime.endTime == slotTimeNo[1] && booking.conferenceRoom.conferenceRoomId == conferenceRoomId && booking.conferenceRoom.floorId == floorId && booking.conferenceRoom.buildingId == buildingId && booking.bookingStatus == BookingStatus.ACTIVE){
                    booking.bookingStatus = BookingStatus.CANCEL
                    bookingUpdated = booking
                }
            })
            console.log('BookingRepository | Successfully cancelled booking')
            return bookingUpdated
        }catch(error){
            console.error('BookingRepository | Error | While cancelling booking')
            throw error
        }  
    }

    listBookings(){
        try{
            console.log('BookingRepository | Successfully listed booking')
            return this.bookings
        }catch(error){
            console.error('BookingRepository | Error | While listing booking')
            throw error
        } 
    }

    listBookingsByUser(userId: string,floorId: string,buildingId: string): Booking[]{
        try{
            console.log('BookingRepository | Successfully listed booking')
            return this.bookings.filter((booking)=>{
                if(booking.userId == userId && booking.conferenceRoom.floorId == floorId && booking.conferenceRoom.buildingId == buildingId) return booking
            })
        }catch(error){
            console.error('BookingRepository | Error | While listing booking')
            throw error
        } 
    }
}