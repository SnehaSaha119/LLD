import { UserService } from "./src/service/userService"
import { BuildingService } from "./src/service/buildingService"
import { FloorService } from "./src/service/floorService"
import { ConferenceService } from "./src/service/conferenceService"
import { BookingService } from "./src/service/bookingService"
import { SlotService } from "./src/service/slotService"
import { ConferenceRepository } from "./src/repository/conferenceRepository"
import { bookingRepository, slotRepository } from "./src/config/storage"
const conferenceRepository = new ConferenceRepository
const userService = new UserService
const buildingService = new BuildingService
const floorService = new FloorService
const conferenceService = new ConferenceService
const bookingService = new BookingService
const slotService = new SlotService

//let slot: any[] = [new Slot('8-9','C1','F1','B1'),new Slot('9-10','C1','F1','B1'),new Slot('8-9','C2','F1','B1'),new Slot('8-9','C1','F2','B1'),new Slot('8-9','C1','F1','B2')];

const userInput = ['ADD USER U1', 'ADD USER U2', 'ADD USER U2',
        'ADD SLOT 8-9', 'ADD SLOT 10-11','ADD SLOT 12-1',
        'ADD BUILDING B1','ADD BUILDING B2','ADD BUILDING B2',
        'ADD FLOOR B1 F1','ADD FLOOR B1 F2','ADD FLOOR B2 F1','ADD FLOOR B2 F1','ADD FLOOR B7 F1',
        'ADD CONFROOM B1 F1 C1 10', 'ADD CONFROOM B1 F1 C2 20', 'ADD CONFROOM B1 F1 C3 11','ADD CONFROOM B1 F2 C1 5','ADD CONFROOM B2 F1 C1 25',
        'BOOK U1 8-9 B1 F1 C1','BOOK U1 8-9 B1 F1 C2','BOOK U1 8-9 B1 F2 C1',
        'BOOK U1 8-9 B1 F2 C1',
        'SEARCH 8-9 B1 F2',
        'CANCEL U1 8-9 B1 F2 C1',
        'SEARCH 8-9 B1 F2',
        'BOOK U1 8-9 C1 F2 B1',
        'LIST BOOKING U1 B1 F1',
        'SEARCH 8-9 B1 F1',
        'SEARCH 10-11 B1 F1',
        'SEARCH 10-11 B1 F1 8',
        'SEARCH 8-9 B1 F1 8',
        'EXIT']

let i=0

try{
    while(userInput[i]!='EXIT'){

        console.log("User entered value : ",userInput[i])
        let inputs = userInput[i].split(" ")
        let result;
        if(inputs[0] == 'ADD'){

            switch(inputs[1]){
                case 'USER':
                    
                    if(userService.isUserExists((inputs[2]))){
                        console.log(` -- User already exists ${inputs[2]}`)
                        break;
                    }
            
                    result = userService.addUser(inputs[2])
                    
                    console.log(` -- Added user ${result}`)
                    break;

                case 'BUILDING':
                    
                    if(buildingService.isBuildingExists((inputs[2]))){
                        console.log(` -- Building already exists ${inputs[2]}`)
                        break;
                    }
            
                    result = buildingService.addBuilding(inputs[2])
                    
                    console.log(` -- Added building ${JSON.stringify(result)}`)
                    break;

                case 'FLOOR':

                    if(floorService.isFloorExists(inputs[3],inputs[2])){
                        console.log(` -- Floor ${inputs[3]} already exists in ${inputs[2]} `)
                        break;
                    }

                    if(!buildingService.isBuildingExists((inputs[2]))){
                        console.log(` -- Building ${inputs[2]} to update with floor ${inputs[3]} doesnt exists`)
                        break;
                    }
            
                    result = floorService.addFloor(inputs[3],inputs[2])
                    
                    console.log(` -- Added floor ${JSON.stringify(result)}`)
                    break;

                case 'CONFROOM':

                    if(conferenceService.isConferenceExists(inputs[4],inputs[3],inputs[2],Number(inputs[5]))){
                        console.log(` --Conference already exists ${inputs[4]}`)
                    }

                    if(!floorService.isFloorExists(inputs[3],inputs[2])){
                        console.log(` -- Floor ${inputs[3]} in ${inputs[2]} to update with conference ${inputs[4]} doesnt exists`)
                        break;
                    }

                    if(!buildingService.isBuildingExists((inputs[2]))){
                        console.log(` -- Building ${inputs[2]} to update with floor ${inputs[3]} doesnt exists`)
                        break;
                    }
            
                    result = conferenceService.addConference(inputs[4],inputs[3],inputs[2],Number(inputs[5]))
                    
                    console.log(` -- Added conference ${JSON.stringify(result)}`)
                    break;

                case 'SLOT':

                    if(slotService.slotExists(inputs[2])){
                        console.log(` --Slot already exists ${inputs[2]}`)
                    }

                    slotService.addSlot(inputs[2])
                    console.log(` --Added slot ${inputs[2]}`)
                    break;

                default:
                    console.log(` --Wrong input : ${inputs[1]} `)
                    break;
            }
        }else if(inputs[0] == 'BOOK'){

            if(bookingService.isBookingExists(inputs[2],inputs[5],inputs[4],inputs[3])){
                console.log(` -- Booking already exists`)
            }else{
                bookingService.addBooking(inputs[1],inputs[2],inputs[5],inputs[4],inputs[3])
                console.log(` -- Booked conference room for user ${inputs[1]} slot ${inputs[2]} conference room ${inputs[5]} floor ${inputs[4]} building ${inputs[3]} `)
            }
            
        }else if(inputs[0] == 'CANCEL'){

            // if(bookingService.isBookingAlreadyCancelled(inputs[1],inputs[2],inputs[5],inputs[4],inputs[3])){
            //     console.log(` -- Booking already cancelled`)
            // }else if(!bookingService.isBookingExists(inputs[2],inputs[5],inputs[4],inputs[3])){
            //     console.log(` -- Booking doesnt exists to cancel`)
            // }else{
            //     let result = bookingService.cancelBooking(inputs[1],inputs[2],inputs[5],inputs[4],inputs[3])
            //     console.log(` --${result} of conference room for user ${inputs[1]} slot ${inputs[2]} conference room ${inputs[5]} floor ${inputs[4]} building ${inputs[3]} `)
            // }

        }else if(inputs[0] == 'LIST'){
            let result = bookingService.listBookingByUser(inputs[2],inputs[4],inputs[3])
            console.log(` ------ all the bookings by user ${inputs[2]}------`)
            result.forEach((value)=>{
                console.log(value.slotTime," ",value.conferenceRoom.floorId," ",value.conferenceRoom.buildingId," ",value.conferenceRoom.conferenceRoomId)
            })
        }else if(inputs[0] == 'SEARCH'){
            let result: string[] = []
            if(inputs[4]){
                result = conferenceService.listConferencesBySlotAndCapacity(inputs[1],inputs[3],inputs [2],Number(inputs[4]))
            }else{
                result = conferenceService.listConferencesBySlot(inputs[1],inputs[3],inputs [2])
            }

            if(result.length==0) console.log("No rooms available")
            else console.log(` ------all the rooms available------`,result)
        }

        // console.log("******Users******",repositoryDataManipulation.listUsers())
        // console.log("******Slots******",slotRepository.listSlots())
        // console.log("******Buidings******",repositoryDataManipulation.listBuildings())
        // console.log("******Floors******",repositoryDataManipulation.listFloors())
        // console.log("******Conference******",repositoryDataManipulation.listConferences())
        // console.log("******Bookings******",bookingRepository.listBookings())

        i++
    }

}catch(error){
    console.error("Error | ",error)
}

// console.log("******Users******",repositoryDataManipulation.listUsers())
// console.log("******Slots******",repositoryDataManipulation.listSlots())
// console.log("******Buidings******",repositoryDataManipulation.listBuildings())
// console.log("******Floors******",repositoryDataManipulation.listFloors())
// console.log("******Conference******",repositoryDataManipulation.listConferences())
// console.log("******Bookings******",repositoryDataManipulation.listBookings())

