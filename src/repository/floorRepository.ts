import { Conference } from "../model/conference"
import { Floor } from "../model/floor"

export class FloorRepository{
    private floors: Floor [] = []

    addFloor(floorId: string,buildingId: string): Floor{
        try{
            let floor =new Floor()
            floor.floorId = floorId
            floor.buildingId = buildingId
            this.floors.push(floor)
            console.log('FloorRepository | Successfully added floor')
            return floor
        }catch(error){
            console.error('FloorRepository | Error | While adding floor')
            throw error
        }
    }

    updateFloorConference(floorId: string,buildingId: string,conference: Conference): Floor|undefined{
        try{
            let floorUpdate;
            this.floors.forEach((floor)=>{
                if(floor.floorId == floorId && floor.buildingId == buildingId){
                    floor.conference.push(conference)
                    floorUpdate = floor
                }
            })
            console.log('FloorRepository | Successfully updated floor conference')
            return floorUpdate
        }catch(error){
            console.error('FloorRepository | Error | While updated floor conference')
            throw error
        }
    }

    deleteFloor(){

    }

    listFloors(): Floor[]{
        try{
            console.log('FloorRepository | Successfully listed floors')
            return this.floors
        }catch(error){
            console.error('FloorRepository | Error | While listing floors')
            throw error
        }
    }

}