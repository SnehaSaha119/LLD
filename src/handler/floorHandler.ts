import express, { Request, Response } from 'express'
import { FloorService } from '../service/floorService'
import { BuildingService } from '../service/buildingService'
import { Conference } from '../model/conference'

export class FloorHandler {
    public router = express.Router()
    floorService: FloorService = new FloorService
    buildingService: BuildingService = new BuildingService
    constructor() {
        this.router.post('/floors', this.addFloor)
        this.router.patch('/floors/:floorId',this.updateFloorConference)
        this.router.get('/floors',this.getFloors)
    }

    addFloor = async (req: Request, res: Response) => {

        try {

            let floorId = req?.body?.floorId
            let buildingId = req?.body?.buildingId
            
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

            if(this.floorService.isFloorExists(floorId,buildingId)){
                return res.status(400).send({
                    Status: 400,
                    Message:'Floor already exists',
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
            
            let floorReceived = this.floorService.addFloor(floorId,buildingId)

            console.log(` -- Added floor ${JSON.stringify(floorReceived)}`)

            // Update building with the floor
            let updatedBuildingReceived = this.buildingService.updateBuildingFloor(floorReceived.buildingId,floorReceived)

            // Pending - Update floor if floor missing

            if(!updatedBuildingReceived){
                console.warn("floorHandler | Building floor was not updated")
                return res.status(400).send({
                    Status: 400,
                    Message:'Building floor was not updated'
                })  

            }

            console.log("floorHandler | Successfully updated building floor")

            return res.status(201).send({
                Status: 201,
                Message:'Floor added',
                data: floorReceived
            }) 

        } catch (error) {
            console.error("Error | ",error)
            return res.status(500).send({
                Status: 500,
                Message:'Internal Server Error'
            })
        }

    }

    updateFloorConference = async (req: Request, res: Response) => {

        try {

            let floorId = req?.params?.floorId as string
            let buildingId = req?.body?.buildingId as string
            let conference = req?.body?.conference as unknown as Conference
            
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

            if (!conference) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing conference'
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

            //Pending - Create conference class
            
            // Update floor with conference
            let updatedFloorReceived = this.floorService.updateFloorConference(floorId,buildingId,conference)

            // Pending - Update conference if missing conference

            if(!updatedFloorReceived){
                console.warn("floorHandler | Floor conference was not updated")
                return res.status(400).send({
                    Status: 400,
                    Message:'Floor conference was not updated'
                })  

            }

            console.log("floorHandler | Successfully updated Floor conference")

            return res.status(201).send({
                Status: 201,
                Message:'Floor conference updated',
                Data: updatedFloorReceived
            }) 

        } catch (error) {
            console.error("Error | ",error)
            return res.status(500).send({
                Status: 500,
                Message:'Internal Server Error'
            })
        }

    }

    getFloors = async (req: Request, res: Response) => {

        try {
    
            let floorsReceived = this.floorService.listFloors()

            console.log(` -- Listed floors ${JSON.stringify(floorsReceived)}`)

            return res.status(201).send({
                Status: 201,
                Message:'Floors listed',
                data: floorsReceived
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
