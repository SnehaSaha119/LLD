import { UserService } from "./src/service/userService"
import { BuildingService } from "./src/service/buildingService"
import { FloorService } from "./src/service/floorService"
import { ConferenceService } from "./src/service/conferenceService"
import { BookingService } from "./src/service/bookingService"
import { RepositoryDataManipulation } from "./src/repository/repositoryDataManipulation"
import { SlotService } from "./src/service/slotService"
const repositoryDataManipulation = new RepositoryDataManipulation()
const userService = new UserService(repositoryDataManipulation)
const buildingService = new BuildingService(repositoryDataManipulation)
const floorService = new FloorService(repositoryDataManipulation)
const conferenceService = new ConferenceService(repositoryDataManipulation)
const bookingService = new BookingService(repositoryDataManipulation)
const slotService = new SlotService(repositoryDataManipulation)


//let slot: any[] = [new Slot('8-9','C1','F1','B1'),new Slot('9-10','C1','F1','B1'),new Slot('8-9','C2','F1','B1'),new Slot('8-9','C1','F2','B1'),new Slot('8-9','C1','F1','B2')];

const userInput = ['ADD USER U1', 'ADD USER U2', 
        'ADD SLOT 8-9', 'ADD SLOT 10-11','ADD SLOT 12-1',
        'ADD BUILDING B1','ADD BUILDING B2',
        'ADD FLOOR B1 F1','ADD FLOOR B1 F2','ADD FLOOR B2 F1',
        'ADD CONFROOM B1 F1 C1', 'ADD CONFROOM B1 F1 C2','ADD CONFROOM B1 F2 C1','ADD CONFROOM B2 F1 C1',
        'BOOK U1 8-9 C1 F1 B1','BOOK U1 8-9 C2 F1 B1','BOOK U1 8-9 C1 F2 B1','BOOK U1 8-9 C1 F2 B1',
        'LIST BOOKING U1 B1 F1',
        'SEARCH 8-9 B1 F1',
        'SEARCH 10-11 B1 F1',
        'EXIT']

let i=0
while(userInput[i]!='EXIT'){

    console.log("User entered value : ",userInput[i])
    let inputs = userInput[i].split(" ")

    if(inputs[0] == 'ADD'){

        switch(inputs[1]){
            case 'USER':
                
                if(userService.userExists((inputs[2]))){
                    console.log(`User already exists ${inputs[2]}`)
                }
        
                userService.addUser(inputs[2])
                
                console.log(`Added user ${inputs[2]} with logs`)
                break;

            case 'BUILDING':
                
                if(buildingService.buildingExists((inputs[2]))){
                    console.log(`Building already exists ${inputs[2]}`)
                }
        
                buildingService.addBuilding(inputs[2])
                
                console.log(`Added building ${inputs[2]}`)
                break;

            case 'FLOOR':

                if(floorService.floorExists(inputs[3],inputs[2])){
                    console.log(`Floor already exists ${inputs[2]}`)
                }
        
                floorService.addFloor(inputs[3],inputs[2])
                
                console.log(`Added floor ${inputs[3]} in building ${inputs[2]}`)
                break;

            case 'CONFROOM':

                if(conferenceService.conferenceExists(inputs[4],inputs[3],inputs[2])){
                    console.log(`Conference already exists ${inputs[4]}`)
                }
        
                conferenceService.addConference(inputs[4],inputs[3],inputs[2])
                
                console.log(`Added conference ${inputs[4]} for floor ${inputs[3]} in building ${inputs[2]}`)
                break;

            case 'SLOT':

                if(slotService.slotExists(inputs[2])){
                    console.log(`Slot already exists ${inputs[2]}`)
                }

                slotService.addSlot(inputs[2])
                console.log(`Added slot ${inputs[2]}`)
                break;

            default:
                console.log(`Wrong input : ${inputs[1]} `)
                break;
        }
    }else if(inputs[0] == 'BOOK'){

        if(bookingService.bookingExists(inputs[1],inputs[2],inputs[3],inputs[4],inputs[5])){
            console.log(`Conference already exists`)
        }else{
            bookingService.addBooking(inputs[1],inputs[2],inputs[3],inputs[4],inputs[5])
            console.log(`Booked conference room for user ${inputs[1]} slot ${inputs[2]} conference room ${inputs[3]} floor ${inputs[4]} building ${inputs[5]} `)
        }
        
    }else if(inputs[0] == 'CANCEL'){

    }else if(inputs[0] == 'LIST'){
        let result = bookingService.listBookingByUser(inputs[2],inputs[4],inputs[3])
        console.log(`----all the bookings by user ${inputs[2]}------`)
        result.forEach((value)=>{
            console.log(value.slotTime," ",value.conferenceRoom.floorId," ",value.conferenceRoom.buildingId," ",value.conferenceRoom.conferenceRoomId)
        })
    }else if(inputs[0] == 'SEARCH'){

        let result = conferenceService.listConferencesBySlot(inputs[1],inputs[3],inputs [2])
        if(result.length==0) console.log("No rooms available")
        else console.log(`----all the rooms available------`,result)
    }

    console.log("******Users******",repositoryDataManipulation.listUsers())
    console.log("******Slots******",repositoryDataManipulation.listSlots())
    console.log("******Buidings******",repositoryDataManipulation.listBuildings())
    console.log("******Floors******",repositoryDataManipulation.listFloors())
    console.log("******Conference******",repositoryDataManipulation.listConferences())
    console.log("******Bookings******",repositoryDataManipulation.listBookings())

    i++
}

