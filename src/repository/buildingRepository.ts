import { Building } from "../model/building";
import { Floor } from "../model/floor";

export class BuildingRepository {
    private buildings : Building[] = []

    addBuilding(buildingId: string): Building{
        try{
            let building = new Building()
            building.buildingId = buildingId
            this.buildings.push(building)
            console.log('BuildingRepository | Successfully added building')
            return building
        }catch(error){
            console.error('BuildingRepository | Error | While adding building')
            throw error
        }
    }

    deleteBuilding(){

    }

    listBuildings(): Building[]{
        try{
            console.log('BuildingRepository | Successfully listed buildings')
            return this.buildings
        }catch(error){
            console.error('BuildingRepository | Error | While listing buildings')
            throw error
        }
    }

    updateBuildingFloor(buildingId: string, floor: Floor): Building | undefined{
        try{
            let buildingUpdate;
            this.buildings.forEach((building)=>{
                if(building.buildingId == buildingId) {
                    building.floors.push(floor)
                    buildingUpdate = building
                }
            })
            console.log('BuildingRepository | Successfully updated building floor')
            return buildingUpdate
        }catch(error){
            console.error('BuildingRepository | Error | While adding building')
            throw error
        }
    }

}