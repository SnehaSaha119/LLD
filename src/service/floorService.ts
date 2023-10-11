import { Floor } from "../model/floor";
import { floorRepository } from '../config/storage'
import { Conference } from "../model/conference";
import { FloorRepositoryDb } from "../repositoryDb/floorRepositoryDb";
import { FloorDb } from "../databaseModel/floorDb";

export class FloorService {
    floorRepository = new FloorRepositoryDb()

    async isFloorExists(floorId: string, buildingId: string): Promise<Boolean> {
        try{
            let floorList = await this.floorRepository.listFloor(floorId,buildingId)
            
            return (floorList) ? true : false
        }catch(error){
            console.error('FloorService | Error | While checking floor exits')
            throw error
        }
    }

    async addFloor(floorId: string,buildingId: string):Promise<FloorDb> {
        try{
            let floorReceived = await this.floorRepository.addFloor(floorId,buildingId)
            console.log("FloorService | Successfully added floor",JSON.stringify(floorReceived))
            return floorReceived
        }catch(error){
            console.error('FloorService | Error | While checking floor exits')
            throw error
        }
    }

    updateFloorConference(floorId: string,buildingId: string,conference: Conference): Floor | undefined{
        try{
            let updatedBuildingReceived = this.floorRepository.updateFloorConference(floorId,buildingId,conference)
            console.log('FloorService | Successfully updated floor conference')
            return updatedBuildingReceived
        }catch(error){
            console.error('FloorService | Error | While updating floor conference')
            throw error
        }
    }

    async listFloors(): Promise<FloorDb[]>{
        try{
            let floorsReceived = await this.floorRepository.listFloors()
            console.log('FloorService | Successfully listed floors',JSON.stringify(floorsReceived))
            return floorsReceived
        }catch(error){
            console.error('FloorService | Error | While listing floors')
            throw error
        }
    }
}