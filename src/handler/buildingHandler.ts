import express, { Request, Response } from 'express'
import { BuildingService } from '../service/buildingService'
import { Floor } from '../model/floor'

export class BuildingHandler {
    public router = express.Router()
    buildingService: BuildingService = new BuildingService()
    constructor() {
        this.router.post('/buildings', this.addBuilding)
        this.router.patch('/buildings/:buildingId', this.updateBuildingFloor)
        this.router.get('/buildings', this.getBuildings)
    }

    addBuilding = async (req: Request, res: Response) => {

        try {

            let buildingId = req?.body?.buildingId
            
            if (!buildingId) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing buildingId'
                })
            }

            if(await this.buildingService.isBuildingExists(buildingId)){
                return res.status(400).send({
                    Status: 400,
                    Message:'Building already exists',
                    data: buildingId
                })      
            }
            
            let result = await this.buildingService.addBuilding(buildingId)  
            console.log(` -- Added building ${JSON.stringify(result)}`)

            return res.status(201).send({
                Status: 201,
                Message:'Building added',
                data: result
            }) 

        } catch (error) {
            console.error("Error | ",error)
            return res.status(500).send({
                Status: 500,
                Message:'Internal Server Error'
            })
        }

    }

    updateBuildingFloor = async (req: Request, res: Response) => {

        try {
            let floor = req?.body?.floor as unknown as Floor
            let buildingId = req?.params?.buildingId as string

            if (!floor) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing floor'
                })
            }

            if (!buildingId) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing buildingId'
                })
            }

            if(!this.buildingService.isBuildingExists(buildingId)){
                return res.status(400).send({
                    Status: 400,
                    Message:'Building doesnt exists',
                    data: buildingId
                })      
            }

            //Pending - Create floor class
            
            let result = this.buildingService.updateBuildingFloor(buildingId,floor)  
            console.log(` -- Updated building floor ${result}`)

            //Pending - update floor if missing in floor

            return res.status(201).send({
                Status: 201,
                Message:'Building floor updated',
                Data: result
            }) 

        } catch (error) {
            console.error("Error | ",error)
            return res.status(500).send({
                Status: 500,
                Message:'Internal Server Error'
            })
        }

    }

    getBuildings = async (req: Request, res: Response) => {

        try {

            let result = await this.buildingService.listBuildings()  
            console.log(` -- Listed buildings ${JSON.stringify(result)}`)

            return res.status(201).send({
                Status: 201,
                Message:'Building listed',
                data: result
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
