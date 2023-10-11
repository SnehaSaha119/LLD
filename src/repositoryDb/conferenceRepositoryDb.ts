import { LessThan, getRepository } from "typeorm"
import { Conference } from "../model/conference"
import { Slot } from "../model/slot"
import { ConferenceDb } from "../databaseModel/conferenceDb"

export class ConferenceRepositoryDb{

    async addConference(conferenceRoomId: string,floorId: string,buildingId: string,capacity: number):Promise<ConferenceDb>{
        try{
            let conferenceAdded = await getRepository(ConferenceDb).save({conferenceRoomId: conferenceRoomId,floorId: floorId, buildingId: buildingId, capacity: capacity})
             console.log('ConferenceRepository | Successfully added conference',JSON.stringify(conferenceAdded)) 
             return conferenceAdded
        }catch(error){
            console.error('ConferenceRepository | Error | While adding conference')
            throw error
        }
    }

    async listConferencesBySlotANDCapacity(slotTime: string,floorId: string,buildingId: string,capacity?: number): Promise<ConferenceDb[]>{
        try{ 
            let slotTimeNo = slotTime.split('-').map((value)=>Number(value))   
            let bookedSlot: Slot = {
                "startTime": slotTimeNo[0],
                "endTime": slotTimeNo[1]
            }
            let conferenceIdsListedBySlotANDCapacity = await getRepository(ConferenceDb).find({
                select: ['conferenceRoomId'],
                where: {
                    bookedSlot,
                    floorId,
                    buildingId,
                    capacity: LessThan(capacity)
                }
            })
            console.log('ConferenceRepository | Successfully listed conference Ids by slot and capacity',JSON.stringify(conferenceIdsListedBySlotANDCapacity))
            return conferenceIdsListedBySlotANDCapacity
        }catch(error){
            console.error('ConferenceRepository | Error | While listConferencesBySlotAndCapacity')
            throw error
        }
    }

    deleteConference(){

    }

    async listConferences(): Promise<ConferenceDb[]>{
        try{
            let conferencesListed = await getRepository(ConferenceDb).find()
            console.log('ConferenceRepository | Successfully listed conferences',JSON.stringify(conferencesListed))
            return conferencesListed
        }catch(error){
            console.error('ConferenceRepository | Error | While listing conferences')
            throw error
        }
    }

    async listConference(conferenceRoomId: string,floorId: string,buildingId: string): Promise<ConferenceDb|null>{
        try{
            let conferenceListed = await getRepository(ConferenceDb).findOne({
                select: ['conferenceRoomId','floorId','buildingId'],
                where: {
                    conferenceRoomId,
                    floorId,
                    buildingId
                }
            })
            console.log('ConferenceRepository | Successfully listed conference',JSON.stringify(conferenceListed))
            return conferenceListed
        }catch(error){
            console.error('FloorRepository | Error | While listing floors')
            throw error
        }
    }

    updateConferenceBookedSlot(slotTime: string,conferenceId: string,floorId: string,buildingId: string): Conference|undefined{
        try{
            let slotTimeNo = slotTime.split('-').map((value)=>Number(value)) 
            let conferenceUpdate;
            // this.conferences.forEach((conference)=>{
            //     if(conference.conferenceRoomId == conferenceId && conference.floorId == floorId && conference.buildingId == buildingId){
            //         let slot = new Slot
            //         slot.startTime = slotTimeNo[0]
            //         slot.endTime = slotTimeNo[1]
            //         conference.bookedSlots.push(slot)
            //         conferenceUpdate = conference
            //     }
            // })
            console.log('ConferenceRepository | Successfully updated conference booked slot')
            return conferenceUpdate
        }catch(error){
            console.error('ConferenceRepository | Error | While updated conference booked slot')
            throw error
        }
    }

    cancelConferenceBookedSlot(slotTime: string,conferenceId: string,floorId: string,buildingId: string): Conference|undefined{
        try{
            let slotTimeNo = slotTime.split('-').map((value)=>Number(value)) 
            let conferenceCancelled;
            // this.conferences.forEach((conference)=>{
            //     if(conference.conferenceRoomId == conferenceId && conference.floorId == floorId && conference.buildingId == buildingId){
            //         let slots = conference.bookedSlots.filter((slot)=>{
            //             if(!(slot.startTime==slotTimeNo[0] && slot.endTime==slotTimeNo[1])){
            //                 return slot
            //             }
            //         })
            //         conference.bookedSlots = [...slots]
            //         conferenceCancelled = conference
            //     }    
            // })
            console.log('ConferenceRepository | Successfully cancelled conference booked slot')
            return conferenceCancelled
        }catch(error){
            console.error('ConferenceRepository | Error | While cancelling conference booked slot')
            throw error
        }
    }

    
}