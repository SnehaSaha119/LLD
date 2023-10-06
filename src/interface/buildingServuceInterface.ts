import { Building } from "../model/building";
import { Floor } from "../model/floor";
import { buildingRepository } from '../config/storage'

export interface BuildingServiceInterface {

    isBuildingExists(buildingId: string):Boolean

    addBuilding(buildingId: string) : Building
    
    updateBuildingFloor(buildingId: string, floor: Floor): Building | undefined
    listBuildings(): Building[]
}