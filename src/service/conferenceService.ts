import { Conference } from "../model/conference";
import { conferenceRepository } from "../config/storage"
import { ConferenceRepositoryDb } from "../repositoryDb/conferenceRepositoryDb";
import { ConferenceDb } from "../databaseModel/conferenceDb";

export class ConferenceService {
    conferenceRepository = new ConferenceRepositoryDb

    async isConferenceExists(conferenceRoomId: string,floorId: string, buildingId: string,capacity?: number): Promise<Boolean> {
        try{
            let conferenceList = await this.conferenceRepository.listConference(conferenceRoomId,floorId,buildingId)
            return (conferenceList) ? true : false
        }catch(error){
            console.error('ConferenceService | Error | While checking conference exits')
            throw error
        }
    }

    async addConference(conferenceRoomId: string,floorId: string,buildingId: string,capacity: number): Promise<ConferenceDb> {
        try{
            let conferenceReceived = await this.conferenceRepository.addConference(conferenceRoomId,floorId,buildingId,capacity)
            console.log('ConferenceService | Successfully added conference')
            return conferenceReceived
        }catch(error){
            console.error('ConferenceService | Error | While adding conference')
            throw error
        }
    }

    async listConferences(): Promise<ConferenceDb[]> {
        try{
            let result = await this.conferenceRepository.listConferences()
            return result
        }catch(error){
            console.error('ConferenceService | Error | While listing conferences')
            throw error
        }
    }

    async listConferencesBySlotAndCapacity(slotTime: string,floorId: string,buildingId: string,capacity?: number):Promise<ConferenceDb[]> {
        try{
            let result = await this.conferenceRepository.listConferencesBySlotANDCapacity(slotTime,floorId,buildingId,capacity)
            return result
        }catch(error){
            console.error('ConferenceService | Error | While listConferencesBySlotAndCapacity')
            throw error
        }
    }

    updateConferenceBookedSlot(slotTime: string, conferenceId: string,floorId: string,buildingId: string): Conference | undefined{
        try{
            let updatedConferenceReceived = this.conferenceRepository.updateConferenceBookedSlot(slotTime,conferenceId,floorId,buildingId)
            console.log('ConferenceService | Successfully updated conference booked slot')
            return updatedConferenceReceived
        }catch(error){
            console.error('ConferenceService | Error | While updating conference booked slot')
            throw error
        }
    }

    cancelConferenceBookedSlot(slotTime: string, conferenceId: string,floorId: string,buildingId: string): Conference | undefined{
        try{
            let updatedConferenceReceived = this.conferenceRepository.cancelConferenceBookedSlot(slotTime,conferenceId,floorId,buildingId)
            console.log('ConferenceService | Successfully cancelled conference booked slot')
            return updatedConferenceReceived
        }catch(error){
            console.error('ConferenceService | Error | While cancelling conference booked slot')
            throw error
        }
    }

    isOverlapping(slotTime: string,conferenceRoomId: string,floorId: string, buildingId: string): Boolean {
        try{
            let overlap = false
            let conferencesList = this.conferenceRepository.listConferences()
            let slotTimeReceived = slotTime.split('-').map((value)=> Number(value))
            let slotStartTimeReceived = slotTimeReceived[0]
            let slotEndTimeReceived = slotTimeReceived[1]

            // conferencesList.forEach((conference: Conference) => {
            //     if (conference.conferenceRoomId == conferenceRoomId  && conference.floorId==floorId && conference.buildingId == buildingId) {
            //         conference.bookedSlots.forEach((bookedSlot)=>{
            //             if((slotStartTimeReceived>bookedSlot.endTime && slotEndTimeReceived>bookedSlot.endTime) || (slotStartTimeReceived<bookedSlot.startTime && slotEndTimeReceived<bookedSlot.startTime)){}
            //             else overlap = true
            //         })
            //     }       
            // })

            return overlap
        }catch(error){
            console.error('BookingService | Error | While checking slot available')
            throw error
        }
    }
}