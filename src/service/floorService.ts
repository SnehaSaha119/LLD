import { Floor } from "../model/floor";
import { floorRepository } from '../config/storage'
import { Conference } from "../model/conference";

export class FloorService {
    floorRepository = floorRepository

    isFloorExists(floorId: string, buildingId: string): Boolean {
        try{
            let floorList = this.floorRepository.listFloors()
            let floorFound = false
            floorList.filter((value: Floor) => {
                if (value.buildingId == buildingId  && value.floorId==floorId) 
                    floorFound = true
            })
            return floorFound
        }catch(error){
            console.error('FloorService | Error | While checking floor exits')
            throw error
        }
    }

    addFloor(floorId: string,buildingId: string) {
        try{
            let floorReceived = this.floorRepository.addFloor(floorId,buildingId)
            console.log("FloorService | Successfully added floor")
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

    listFloors(): Floor[]{
        try{
            let floorsReceived = this.floorRepository.listFloors()
            console.log('FloorService | Successfully listed floors')
            return floorsReceived
        }catch(error){
            console.error('FloorService | Error | While listing floors')
            throw error
        }
    }
}