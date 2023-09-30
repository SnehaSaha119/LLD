import { BookingStatus } from "../enum/bookingStatus";
import { Booking } from "../model/booking";
import { Slot } from "../model/slot";
import { RepositoryDataManipulation } from "../repository/repositoryDataManipulation";

export class BookingService {
    repositoryDataManipulation: RepositoryDataManipulation
    constructor(repositoryDataManipulation : RepositoryDataManipulation){
        this.repositoryDataManipulation = repositoryDataManipulation
    }

    bookingExists(userId: string, slotTime: string,conferenceRoomId: string,floorId: string, buildingId: string) {

        let bookingList = this.repositoryDataManipulation.listBookings()
        let flag = false
        bookingList.filter((value: Booking) => {
            if (value.userId == userId && value.slotTime == slotTime && value.conferenceRoom.conferenceRoomId == conferenceRoomId  && value.conferenceRoom.floorId==floorId && value.conferenceRoom.buildingId == buildingId && value.bookingStatus == BookingStatus.ACTIVE) 
                flag = true
        })

        return flag ? true : false
    }

    addBooking(userId: string, slotTime: string, conferenceRoomId: string,floorId: string,buildingId: string) {

        this.repositoryDataManipulation.addBooking(userId,slotTime,conferenceRoomId,floorId,buildingId)

        return 'Successfully added conference'
    }

    bookingAlreadyCancelled(userId: string, slotTime: string,conferenceRoomId: string,floorId: string, buildingId: string) {

        let bookingList = this.repositoryDataManipulation.listBookings()
        let flag = false
        bookingList.filter((value: Booking) => {
            if (value.userId == userId && value.slotTime == slotTime && value.conferenceRoom.conferenceRoomId == conferenceRoomId  && value.conferenceRoom.floorId==floorId && value.conferenceRoom.buildingId == buildingId && value.bookingStatus == BookingStatus.CANCEL) 
                flag = true
        })

        return flag ? true : false
    }

    cancelBooking(userId: string, slotTime: string,conferenceRoomId: string,floorId: string,buildingId: string){

        this.repositoryDataManipulation.cancelBooking(userId,slotTime,conferenceRoomId,floorId,buildingId)

        return 'Successfully cancelled booking'
    }

    listBookingByUser(userId: string,floorId: string,buildingId: string){

        let result = this.repositoryDataManipulation.listBookingsByUser(userId,floorId,buildingId)

        return result
    }
}