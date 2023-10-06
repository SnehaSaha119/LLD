import { Conference } from "../model/conference";
import { conferenceRepository } from "../config/storage"

export class ConferenceService {
    conferenceRepository = conferenceRepository

    isConferenceExists(conferenceRoomId: string,floorId: string, buildingId: string,capacity?: number): Boolean {
        try{
            let conferenceList = this.conferenceRepository.listConferences()
            let conferenceFound = false
            conferenceList.filter((value: Conference) => {
                if (value.conferenceRoomId == conferenceRoomId  && value.floorId==floorId && value.buildingId==buildingId)
                    conferenceFound = (capacity!=undefined) ? ((value.capacity == capacity) ? true : false) : true
            })
            return conferenceFound
        }catch(error){
            console.error('ConferenceService | Error | While checking conference exits')
            throw error
        }
    }

    addConference(conferenceRoomId: string,floorId: string,buildingId: string,capacity: number): Conference {
        try{
            let conferenceReceived = this.conferenceRepository.addConference(conferenceRoomId,floorId,buildingId,capacity)
            console.log('ConferenceService | Successfully added conference')
            return conferenceReceived
        }catch(error){
            console.error('ConferenceService | Error | While adding conference')
            throw error
        }
    }

    listConferences() {
        try{
            let result = this.conferenceRepository.listConferences()
            return result
        }catch(error){
            console.error('ConferenceService | Error | While listing conferences')
            throw error
        }
    }

    listConferencesBySlot(slotTime: string,floorId: string,buildingId: string) {
        try{
            let result = this.conferenceRepository.listConferencesBySlot(slotTime,floorId,buildingId)
            return result
        }catch(error){
            console.error('ConferenceService | Error | While listConferencesBySlot')
            throw error
        }
    }

    listConferencesBySlotAndCapacity(slotTime: string,floorId: string,buildingId: string,capacity: number) {
        try{
            let result = this.conferenceRepository.listConferencesBySlotAndCapacity(slotTime,floorId,buildingId,capacity)
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

            conferencesList.forEach((conference: Conference) => {
                if (conference.conferenceRoomId == conferenceRoomId  && conference.floorId==floorId && conference.buildingId == buildingId) {
                    conference.bookedSlots.forEach((bookedSlot)=>{
                        if((slotStartTimeReceived>bookedSlot.endTime && slotEndTimeReceived>bookedSlot.endTime) || (slotStartTimeReceived<bookedSlot.startTime && slotEndTimeReceived<bookedSlot.startTime)){}
                        else overlap = true
                    })
                }       
            })

            return overlap
        }catch(error){
            console.error('BookingService | Error | While checking slot available')
            throw error
        }
    }
}