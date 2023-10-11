import { getRepository } from "typeorm";
import { BuildingDb } from "../databaseModel/buildingDb";
import { Building } from "../model/building";
import { Floor } from "../model/floor";

export class BuildingRepositoryDb {

    async addBuilding(buildingId: string): Promise<BuildingDb>{
        try{
            let buildingAdded = await getRepository(BuildingDb).save({buildingId: buildingId})
             console.log('BuildingRepository | Successfully added building',JSON.stringify(buildingAdded)) 
             return buildingAdded
        }catch(error){
            console.error('BuildingRepository | Error | While adding building')
            throw error
        }
    }

    deleteBuilding(){

    }

    async listBuildings(): Promise<BuildingDb[]>{
        try{
            let buildingsListed = await getRepository(BuildingDb).find()
            console.log('BuildingRepository | Successfully listed buildings',JSON.stringify(buildingsListed))
            return buildingsListed
        }catch(error){
            console.error('BuildingRepository | Error | While listing buildings')
            throw error
        }
    }

    updateBuildingFloor(buildingId: string, floor: Floor): Building | undefined{
        try{
            let buildingUpdate;
            // this.buildings.forEach((building)=>{
            //     if(building.buildingId == buildingId) {
            //         building.floors.push(floor)
            //         buildingUpdate = building
            //     }
            // })
            console.log('BuildingRepository | Successfully updated building floor')
            return buildingUpdate
        }catch(error){
            console.error('BuildingRepository | Error | While adding building')
            throw error
        }
    }

    async listBuilding(buildingId: string): Promise<BuildingDb | null>{
        try{

            let buildingListed = await getRepository(BuildingDb).findOne({
                select: ['buildingId'],
                where: {
                    buildingId
                }
            })
            
            console.log('BuildingRepository | Successfully listed building', JSON.stringify(buildingListed))
            return buildingListed
            
        }catch(error){
            console.error('UserRepository | Error | While listing users')
            throw error
        }
    }

}