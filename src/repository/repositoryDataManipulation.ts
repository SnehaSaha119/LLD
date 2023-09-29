import { Booking } from "../model/booking";
import { Building } from "../model/building";
import { Conference } from "../model/conference";
import { Floor } from "../model/floor";
import { Slot } from "../model/slot";
import { User } from "../model/user";

export class RepositoryDataManipulation {
    users : User[] = []
    slots : Slot [] = []
    buildings: Building[] = []
    floors: Floor[] = []
    conferences: Conference[] = []
    bookings: Booking[] = []

    // constructor(users: User[],
    //     slots : Slot [],
    //     buildings: Building[],
    //     floors: Floor[],
    //     conferences: Conference[],
    //     bookings: Booking[]){

    //     this.users = users
    //     this.slots = slots
    //     this.buildings = buildings
    //     this.floors = floors
    //     this.conferences = conferences
    //     this.bookings = bookings

    // }

    //User
    addUser(userId: string){
        this.users.push(new User(userId))
    }

    deleteUser(){

    }

    listUsers(){
        return this.users
    }

    //Slot
    addSlot(slotTime: string){
        this.slots.push(new Slot(slotTime))
    }

    deleteSlot(){

    }

    listSlots(){
        return this.slots
    }

    //Building
    addBuilding(buildingId: string,){
        let b =new Building()
        b.buildingId = buildingId
        this.buildings.push(b)
    }

    deleteBuilding(){

    }

    listBuildings(){
        return this.buildings
    }

    //Floor
    addFloor(floorId: string,buildingId: string){
        let f =new Floor()
        f.floorId = floorId
        f.buildingId = buildingId
        this.floors.push(f)

        //update building
        this.buildings.forEach((building)=>{
            if(building.buildingId == buildingId) building.floors.push(f)
        })
    }

    deleteFloor(){

    }

    listFloors(){
        return this.floors
    }

    
    //Conference
    addConference(conferenceRoomId: string,floorId: string,buildingId: string){
        let c = new Conference()
        c.conferenceRoomId = conferenceRoomId
        c.floorId = floorId
        c.buildingId = buildingId
        this.conferences.push(c)

        //update floor
        this.floors.forEach((floor)=>{
            if(floor.floorId == floorId && floor.buildingId == buildingId) floor.conferenceRooms.push(c)
        })
    }

    listConferencesBySlot(slotTime: string,floorId: string,buildingId: string){
        let result: string[] = []
        this.conferences.forEach((conference)=>{
            if(!conference.bookedSlot[slotTime] && conference.floorId == floorId && conference.buildingId == buildingId) 
                result.push(conference.conferenceRoomId)
        })

        return result
    }

    deleteConference(){

    }

    listConferences(){
        return this.conferences
    }


    //Booking
    addBooking(userId: string,slotTime:string,conferenceRoomId: string,floorId: string,buildingId: string){
        let bg = new Booking()
        bg.bookingId = 'B' + Math.random()
        bg.conferenceRoom.conferenceRoomId = conferenceRoomId
        bg.conferenceRoom.floorId = floorId
        bg.conferenceRoom.buildingId = buildingId
        bg.slotTime = slotTime
        bg.userId = userId
        this.bookings.push(bg)

        //Update confernce list
        this.conferences.forEach((conference)=>{
            if(conference.conferenceRoomId == conferenceRoomId)
                conference.bookedSlot[slotTime]=slotTime
        })
    }

    deleteBooking(){

    }

    listBookings(){
        return this.bookings
    }

    listBookingsByUser(userId: string,floorId: string,buildingId: string){

        return this.bookings.filter((booking)=>{
            if(booking.userId == userId && booking.conferenceRoom.floorId == floorId && booking.conferenceRoom.buildingId) return booking
        })

    }

}