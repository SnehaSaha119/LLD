import { getRepository } from "typeorm"
import { FloorDb } from "../databaseModel/floorDb"
import { Conference } from "../model/conference"
import { Floor } from "../model/floor"

export class FloorRepositoryDb{

    async addFloor(floorId: string,buildingId: string): Promise<FloorDb>{
        try{
            let floorAdded = await getRepository(FloorDb).save({floorId: floorId, buildingId: buildingId})
             console.log('FloorRepository | Successfully added floor',JSON.stringify(floorAdded)) 
             return floorAdded
        }catch(error){
            console.error('FloorRepository | Error | While adding floor')
            throw error
        }
    }

    updateFloorConference(floorId: string,buildingId: string,conference: Conference): Floor|undefined{
        try{
            let floorUpdate;
            // this.floors.forEach((floor)=>{
            //     if(floor.floorId == floorId && floor.buildingId == buildingId){
            //         floor.conference.push(conference)
            //         floorUpdate = floor
            //     }
            // })
            console.log('FloorRepository | Successfully updated floor conference')
            return floorUpdate
        }catch(error){
            console.error('FloorRepository | Error | While updated floor conference')
            throw error
        }
    }

    deleteFloor(){

    }

    async listFloors(): Promise<FloorDb[]>{
        try{
            let floorsListed = await getRepository(FloorDb).find()
            console.log('FloorRepository | Successfully listed floors',JSON.stringify(floorsListed))
            return floorsListed
        }catch(error){
            console.error('FloorRepository | Error | While listing floors')
            throw error
        }
    }

    async listFloor(floorId: string,buildingId: string): Promise<FloorDb|null>{
        try{
            let floorListed = await getRepository(FloorDb).findOne({
                select: ['floorId','buildingId'],
                where: {
                    floorId,
                    buildingId
                }
            })
            console.log('FloorRepository | Successfully listed floors',JSON.stringify(floorListed))
            return floorListed
        }catch(error){
            console.error('FloorRepository | Error | While listing floors')
            throw error
        }
    }

}