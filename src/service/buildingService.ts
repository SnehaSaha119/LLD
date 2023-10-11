import { BuildingDb } from "../databaseModel/buildingDb";
import { Building } from "../model/building";
import { Floor } from "../model/floor";
import { BuildingRepositoryDb } from "../repositoryDb/buildingRepositoryDb";

export class BuildingService {

    buildingRepository = new BuildingRepositoryDb()

    async isBuildingExists(buildingId: string):Promise<Boolean>{
        try{
            let buildingList = await this.buildingRepository.listBuilding(buildingId)

            console.log('BuildingService | Successfully listed existing building', JSON.stringify(buildingList))
            
            return (buildingList) ? true : false

        }catch(error){
            console.error('BuildingService | Error | While checking building exists')
            throw error
        }
    }

    async addBuilding(buildingId: string) : Promise<BuildingDb>{
        try{

            let buildingReceived = await this.buildingRepository.addBuilding(buildingId)
            console.log('BuildingService | Successfully added building',JSON.stringify(buildingReceived))
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

    async listBuildings(): Promise<BuildingDb[]>{
        try{
            let buildingsReceived = await this.buildingRepository.listBuildings()
            console.log('BuildingService | Successfully listed buildings',JSON.stringify(buildingsReceived))
            return buildingsReceived
        }catch(error){
            console.error('BuildingService | Error | While listing buildings')
            throw error
        }
    }
}