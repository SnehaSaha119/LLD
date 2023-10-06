import { Conference } from "../model/conference";
import { conferenceRepository } from "../config/storage"

export interface ConferenceServiceInterface {
    isConferenceExists:(conferenceRoomId: string,floorId: string, buildingId: string,capacity?: number)=>Boolean
    addConference:(conferenceRoomId: string,floorId: string,buildingId: string,capacity: number)=> Conference 
    listConferences:() => Conference[]
    listConferencesBySlot:(slotTime: string,floorId: string,buildingId: string)=> string[]
    listConferencesBySlotAndCapacity:(slotTime: string,floorId: string,buildingId: string,capacity: number)  => string[]
    updateConferenceBookedSlot:(slotTime: string, conferenceId: string,floorId: string,buildingId: string)=> Conference | undefined
    cancelConferenceBookedSlot:(slotTime: string, conferenceId: string,floorId: string,buildingId: string)=> Conference | undefined
}