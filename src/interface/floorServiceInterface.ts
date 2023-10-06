import { floorRepository } from '../config/storage'
import { Conference } from '../model/conference';
import { Floor } from '../model/floor';
export interface FloorServiceInterface {
    isFloorExists:(floorId: string, buildingId: string)=> Boolean;
    addFloor:(floorId: string,buildingId: string)=> Floor;
    updateFloorConference:(floorId: string,buildingId: string,conference: Conference)=> Floor | undefined;
    listFloors:()=> Floor[];
}

