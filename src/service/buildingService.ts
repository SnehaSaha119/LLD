import { Building } from "../model/building";
import { Floor } from "../model/floor";
import { buildingRepository } from '../config/storage'

export class BuildingService {

    buildingRepository = buildingRepository

    isBuildingExists(buildingId: string):Boolean{
        try{
            let buildingList = this.buildingRepository.listBuildings()
            let buildFound = false
            buildingList.filter((value: Building) => {
                if (value.buildingId == buildingId) 
                buildFound = true
            })
            return buildFound
        }catch(error){
            console.error('BuildingService | Error | While checking building exists')
            throw error
        }
    }

    addBuilding(buildingId: string) : Building{
        try{
            let buildingReceived = this.buildingRepository.addBuilding(buildingId)
            console.log('BuildingService | Successfully added building')
            return buildingReceived
        }catch(error){
            console.error('BuildingService | Error | While adding building')
            throw error
        }
    }
    
    updateBuildingFloor(buildingId: string, floor: Floor): Building | undefined{
        try{
            let updatedBuildingReceived = this.buildingRepository.updateBuildingFloor(buildingId,floor)
            console.log('BuildingService | Successfully updated building floor')
            return updatedBuildingReceived
        }catch(error){
            console.error('BuildingService | Error | While updating floor of building')
            throw error
        }
    }

    listBuildings(): Building[]{
        try{
            let buildingsReceived = this.buildingRepository.listBuildings()
            console.log('BuildingService | Successfully listed buildings')
            return buildingsReceived
        }catch(error){
            console.error('BuildingService | Error | While listing buildings')
            throw error
        }
    }
}