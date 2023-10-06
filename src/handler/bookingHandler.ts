import express, {Request,Response} from "express"
import { ConferenceService } from "../service/conferenceService"
import { FloorService } from "../service/floorService"
import { BuildingService } from "../service/buildingService"
import { BookingService } from "../service/bookingService"

export class BookingHandler{
    public router = express.Router()
    bookingService = new BookingService
    conferenceService = new ConferenceService
    floorService = new FloorService
    buildingService = new BuildingService
    constructor() {
        this.router.post('/bookings', this.addBooking)
        this.router.get('/bookings',this.listBookingByUser)
        this.router.post('/bookings/:bookingId/cancellation',this.cancelBooking)
    }

    addBooking = async (req: Request, res: Response) => {

        try {
            let userId = req?.body?.userId as string
            let slotTime = req?.body?.slotTime as string
            let conferenceId = req?.body?.conferenceId as string
            let floorId = req?.body?.floorId as string
            let buildingId = req?.body?.buildingId as string
            let bookingId = req?.body?.bookingId as string

            if (!floorId) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing floorId'
                })
            }

            if (!buildingId) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing buildingId'
                })
            }

            if (!conferenceId) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing conferenceId'
                })
            }

            if (!userId) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing userId'
                })
            }

            if (!slotTime) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing slotTime'
                })
            }

            if(this.bookingService.isBookingExists(slotTime,conferenceId,floorId,buildingId)){
                return res.status(400).send({
                    Status: 400,
                    Message:'Booking already exists'
                })      
            }

            if(this.conferenceService.isOverlapping(slotTime,conferenceId,floorId,buildingId)){
                return res.status(400).send({
                    Status: 400,
                    Message:'Overlapping in booking time'
                })      
            }


            if(!this.conferenceService.isConferenceExists(conferenceId,floorId,buildingId)){
                return res.status(400).send({
                    Status: 400,
                    Message:'Conference doesnt exists'
                })      
            }

            if(!this.floorService.isFloorExists(floorId,buildingId)){
                return res.status(400).send({
                    Status: 400,
                    Message:'Floor doesnt exists'
                })      
            }

            if(!this.buildingService.isBuildingExists(buildingId)){
                return res.status(400).send({
                    Status: 400,
                    Message:'Building doesnt exists'
                })      
            }
            
            let bookingReceived = this.bookingService.addBooking(userId,slotTime,conferenceId,floorId,buildingId)

            console.log(` -- Added booking ${bookingReceived}`)

            //Update confernce list
            let updatedConferenceReceived = this.conferenceService.updateConferenceBookedSlot(slotTime,conferenceId,floorId,buildingId)

            if(!updatedConferenceReceived){
                console.warn("BookingHandler | Conference booked slot was not updated")
                return res.status(400).send({
                    Status: 400,
                    Message:'Conference booked slot was not updated'
                })  

            }
            console.log("BookingHandler | Successfully updated conference booked slot")

            return res.status(201).send({
                Status: 201,
                Message:'Booking added',
                data: bookingReceived
            }) 

        } catch (error) {
            console.error("Error | ",error)
            return res.status(500).send({
                Status: 500,
                Message:'Internal Server Error'
            })
        }

    }

    listBookingByUser = async (req: Request, res: Response) => {

        try {
            let userId = req?.query?.userId as string
            let floorId = req?.query?.floorId as string
            let buildingId = req?.query?.buildingId as string

            if (!floorId) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing floorId'
                })
            }

            if (!buildingId) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing buildingId'
                })
            }

            if (!userId) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing userId'
                })
            }

            let bookingReceived = this.bookingService.listBookingByUser(userId,floorId,buildingId)

            console.log(` -- All bookings ${bookingReceived}`)

            return res.status(201).send({
                Status: 201,
                Message:'All bookings by user',
                Data: bookingReceived
            }) 

        } catch (error) {
            console.error("Error | ",error)
            return res.status(500).send({
                Status: 500,
                Message:'Internal Server Error'
            })
        }

    }

    cancelBooking = async (req: Request, res: Response) => {

        try {
            let userId = req?.body?.userId as string
            let slotTime = req?.body?.slotTime as string
            let conferenceId = req?.body?.conferenceId as string
            let floorId = req?.body?.floorId as string
            let buildingId = req?.body?.buildingId as string
            let bookingId = req?.params.bookingId as string

            if (!floorId) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing floorId'
                })
            }

            if (!buildingId) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing buildingId'
                })
            }

            if (!conferenceId) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing conferenceId'
                })
            }

            if (!userId) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing userId'
                })
            }

            if (!slotTime) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing slotTime'
                })
            }

            if(!this.bookingService.isBookingExistsForCancellation(bookingId)){
                return res.status(400).send({
                    Status: 400,
                    Message:'Booking doesnt exists'
                })      
            }

            if(this.bookingService.isBookingAlreadyCancelled(userId,slotTime,conferenceId,floorId,buildingId,bookingId)){
                return res.status(400).send({
                    Status: 400,
                    Message:'Booking already cancelled'
                })      
            }

            if(!this.conferenceService.isConferenceExists(conferenceId,floorId,buildingId)){
                return res.status(400).send({
                    Status: 400,
                    Message:'Conference doesnt exists'
                })      
            }

            if(!this.floorService.isFloorExists(floorId,buildingId)){
                return res.status(400).send({
                    Status: 400,
                    Message:'Floor doesnt exists'
                })      
            }

            if(!this.buildingService.isBuildingExists(buildingId)){
                return res.status(400).send({
                    Status: 400,
                    Message:'Building doesnt exists'
                })      
            }
            
            let bookingUpdated = this.bookingService.cancelBooking(userId,slotTime,conferenceId,floorId,buildingId,bookingId)

            console.log(` -- Cancelled booking ${bookingUpdated}`)

            //cancell booked slot in confernce list
            let cancelConferenceReceived = this.conferenceService.cancelConferenceBookedSlot(slotTime,conferenceId,floorId,buildingId)

            if(!cancelConferenceReceived){
                console.warn("BookingHandler | Conference booked slot was not cancelled")
                return res.status(400).send({
                    Status: 400,
                    Message:'Conference booked slot was not cancelled'
                })  

            }
            console.log("BookingHandler | Successfully cancelled conference booked slot")

            return res.status(201).send({
                Status: 201,
                Message:'Booking cancelled'
            }) 

        } catch (error) {
            console.error("Error | ",error)
            return res.status(500).send({
                Status: 500,
                Message:'Internal Server Error'
            })
        }

    }

}

