import express, {Request,Response} from "express"
import { ConferenceService } from "../service/conferenceService"
import { FloorService } from "../service/floorService"
import { BuildingService } from "../service/buildingService"

export class ConferenceHandler {
    public router = express.Router()
    conferenceService = new ConferenceService
    floorService = new FloorService
    buildingService = new BuildingService
    constructor() {
        this.router.post('/conference-rooms', this.addConference)
        this.router.get('/conference-rooms',this.listConferences)
        this.router.get('/conference-rooms/availability',this.listConferencesBySlotAndCapacity)
        this.router.patch('/conference-rooms/:conferenceId',this.updateConferenceBookedSlot)
        this.router.post('/conference-rooms/:conferenceId/cancellation',this.cancelConferenceBookedSlot)
    }

    addConference = async (req: Request, res: Response) => {

        try {
            let conferenceId = req?.body?.conferenceId as string
            let floorId = req?.body?.floorId as string
            let buildingId = req?.body?.buildingId as string
            let capacity = req?.body?.capacity as number

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

            if (!capacity) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing capacity'
                })
            }

            if(await this.conferenceService.isConferenceExists(conferenceId,floorId,buildingId,capacity)){
                return res.status(400).send({
                    Status: 400,
                    Message:'Conference already exists',
                    data: conferenceId
                })      
            }

            if(! await this.floorService.isFloorExists(floorId,buildingId)){
                return res.status(400).send({
                    Status: 400,
                    Message:'Floor doesnt exists',
                    data: floorId
                })      
            }

            if(! await this.buildingService.isBuildingExists(buildingId)){
                return res.status(400).send({
                    Status: 400,
                    Message:'Building doesnt exists',
                    data: buildingId
                })      
            }
            
            let conferenceReceived = await this.conferenceService.addConference(conferenceId,floorId,buildingId,capacity)

            console.log(` -- Added conference ${JSON.stringify(conferenceReceived)}`)

            // // Update building with the floor
            // let updatedFloorReceived = this.floorService.updateFloorConference(floorId,buildingId,conferenceReceived)

            // if(!updatedFloorReceived){
            //     console.warn("ConferenceHandler | Floor conference was not updated")
            //     return res.status(400).send({
            //         Status: 400,
            //         Message:'Floor conference was not updated'
            //     })  

            // }
            console.log("ConferenceHandler | Successfully updated floor conference")

            return res.status(201).send({
                Status: 201,
                Message:'Conference added',
                data: conferenceReceived
            }) 

        } catch (error) {
            console.error("Error | ",error)
            return res.status(500).send({
                Status: 500,
                Message:'Internal Server Error'
            })
        }

    }

    listConferences = async (req: Request, res: Response) => {

        try {

            let conferencesReceived = await this.conferenceService.listConferences()
            console.log(`Conferences listed ${JSON.stringify(conferencesReceived)}`)
            return res.status(201).send({
                Status: 200,
                Message:'Conference listed',
                data: conferencesReceived
            })  
        } catch (error) {
            console.error("Error | ",error)
            return res.status(500).send({
                Status: 500,
                Message:'Internal Server Error'
            })
        }

    }


    listConferencesBySlotAndCapacity = async (req: Request, res: Response) => {

        try {
            let slotTime = req?.query?.slotTime as string
            let floorId = req?.query?.floorId as string
            let buildingId = req?.query?.buildingId as string
            let capacity = req?.query?.capacity as unknown as number

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

            if (!slotTime) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing slotTime'
                })
            }

            let conferenceReceived = await this.conferenceService.listConferencesBySlotAndCapacity(slotTime,floorId,buildingId,capacity)

            if(conferenceReceived.length==0){
                console.warn("ConferenceHandler | No rooms available")
                return res.status(201).send({
                    Status: 200,
                    Message:'No rooms available'
                })  
            }else{
                console.warn(`ConferenceHandler | rooms available ${conferenceReceived}`)
                return res.status(201).send({
                    Status: 200,
                    Message:'Rooms available',
                    data: conferenceReceived
                })
            }
        } catch (error) {
            console.error("Error | ",error)
            return res.status(500).send({
                Status: 500,
                Message:'Internal Server Error'
            })
        }

    }

    updateConferenceBookedSlot = async (req: Request, res: Response) => {

        try {
            
            let slotTime = req?.body?.slotTime as string
            let floorId = req?.body?.floorId as string
            let buildingId = req?.body?.buildingId as string
            let conferenceId = req?.params?.conferenceId as string
            
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

            if (!slotTime) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing slotTime'
                })
            }

            
            if (!conferenceId) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing conferenceId'
                })
            }

            if(!this.conferenceService.isConferenceExists(conferenceId,floorId,buildingId)){
                return res.status(400).send({
                    Status: 400,
                    Message:'Conference doesnt exists',
                    data: conferenceId
                })      
            }

            if(!this.floorService.isFloorExists(floorId,buildingId)){
                return res.status(400).send({
                    Status: 400,
                    Message:'Floor doesnt exists',
                    data: floorId
                })      
            }

            if(!this.buildingService.isBuildingExists(buildingId)){
                return res.status(400).send({
                    Status: 400,
                    Message:'Building doesnt exists',
                    data: buildingId
                })      
            }

            // Update conference with booked slot
            let updatedConferenceReceived = this.conferenceService.updateConferenceBookedSlot(slotTime,conferenceId,floorId,buildingId)

            if(!updatedConferenceReceived){
                console.warn("ConferenceHandler | Conference booked slot was not updated")
                return res.status(400).send({
                    Status: 400,
                    Message:'Conference booked slot was not updated'
                })  

            }

            console.log("ConferenceHandler | Successfully updated Conference booked slot")

            return res.status(201).send({
                Status: 201,
                Message:'Conference booked slot updated',
                Data: updatedConferenceReceived
            }) 

        } catch (error) {
            console.error("Error | ",error)
            return res.status(500).send({
                Status: 500,
                Message:'Internal Server Error'
            })
        }

    }

    cancelConferenceBookedSlot = async (req: Request, res: Response) => {

        try {
            
            let slotTime = req?.body?.slotTime as string
            let floorId = req?.body?.floorId as string
            let buildingId = req?.body?.buildingId as string
            let conferenceId = req?.params?.conferenceId as string

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

            if (!slotTime) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing slotTime'
                })
            }

            
            if (!conferenceId) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing conferenceId'
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
            
            // cancel conference with booked slot
            let cancelConferenceReceived = this.conferenceService.cancelConferenceBookedSlot(slotTime,conferenceId,floorId,buildingId)

            if(!cancelConferenceReceived){
                console.warn("ConferenceHandler | Conference booked slot was not cancelled")
                return res.status(400).send({
                    Status: 400,
                    Message:'Conference booked slot was not cancelled'
                })  

            }

            console.log("ConferenceHandler | Successfully updated Conference booked slot")

            return res.status(201).send({
                Status: 201,
                Message:'Conference booked slot updated',
                Data: cancelConferenceReceived
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
