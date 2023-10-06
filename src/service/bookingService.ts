import { bookingRepository } from "../config/storage";
import { BookingStatus } from "../enum/bookingStatus";
import { Booking } from "../model/booking";

export class BookingService {
    bookingRepository = bookingRepository

    isBookingExists(slotTime: string,conferenceRoomId: string,floorId: string, buildingId: string): Boolean {
        try{
            let bookingList = this.bookingRepository.listBookings()
            let slotTimeNo = slotTime.split('-').map((value)=>Number(value))
            let bookingFound = false
            bookingList.filter((value: Booking) => {
                if (value.slotTime.startTime == slotTimeNo[0] && value.slotTime.endTime == slotTimeNo[1] && value.conferenceRoom.conferenceRoomId == conferenceRoomId  && value.conferenceRoom.floorId==floorId && value.conferenceRoom.buildingId == buildingId && value.bookingStatus == BookingStatus.ACTIVE) 
                bookingFound = true
            })
            return bookingFound
        }catch(error){
            console.error('BookingService | Error | While checking booking exists')
            throw error
        }
    }

    isBookingExistsForCancellation(bookingId: string): Boolean {
        try{
            let bookingList = this.bookingRepository.listBookings()
            let bookingFound = false
            bookingList.forEach((value: Booking) => {
                if (value.bookingId == bookingId && value.bookingStatus == BookingStatus.ACTIVE) 
                    bookingFound = true
            })
            return bookingFound
        }catch(error){
            console.error('BookingService | Error | While checking booking exists')
            throw error
        }
    }

    addBooking(userId: string, slotTime: string, conferenceRoomId: string,floorId: string,buildingId: string): Booking {
        try{
            let bookingReceived = this.bookingRepository.addBooking(userId,slotTime,conferenceRoomId,floorId,buildingId)
            console.log('BookingService | Successfully added booking')
            return bookingReceived
        }catch(error){
            console.error('BookingService | Error | While adding booking')
            throw error
        }
    }

    isBookingAlreadyCancelled(userId: string, slotTime: string,conferenceRoomId: string,floorId: string, buildingId: string,bookingId: string): boolean {
        try{
            let bookingList = this.bookingRepository.listBookings()
            let slotTimeNo = slotTime.split('-').map((value)=>Number(value))
            let bookingCancelled = false
            bookingList.filter((value: Booking) => {
                if (value.bookingId==bookingId && value.userId == userId && value.slotTime.startTime == slotTimeNo[0] && value.slotTime.endTime == slotTimeNo[1]  && value.conferenceRoom.conferenceRoomId == conferenceRoomId  && value.conferenceRoom.floorId==floorId && value.conferenceRoom.buildingId == buildingId && value.bookingStatus == BookingStatus.CANCEL) 
                    bookingCancelled = true
            })
            return bookingCancelled
        }catch(error){
            console.error('BookingService | Error | While checking booking already cancelled')
            throw error
        }
    }

    cancelBooking(userId: string, slotTime: string,conferenceRoomId: string,floorId: string,buildingId: string,bookingId: string): Booking|undefined{
        try{
            let bookingUpdated = this.bookingRepository.cancelBooking(userId,slotTime,conferenceRoomId,floorId,buildingId,bookingId)
            if(!bookingUpdated){
                console.warn('BookingService | Booking was not cancelled due to error')
                return
            }
            console.log('BookingService | Successfully cancelled booking')
            return bookingUpdated
        }catch(error){
            console.error('BookingService | Error | While cancelling booking')
            throw error
        }
    }

    listBookingByUser(userId: string,floorId: string,buildingId: string){
        try{
            let result = this.bookingRepository.listBookingsByUser(userId,floorId,buildingId)
            console.log('BookingService | Successfully listed booking')
            return result
        }catch(error){
            console.error('BookingService | Error | While listing booking')
            throw error
        }
    }
}