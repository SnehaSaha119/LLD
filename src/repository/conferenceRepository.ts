import { Conference } from "../model/conference"
import { Slot } from "../model/slot"

export class ConferenceRepository{
    private conferences : Conference [] = []

    addConference(conferenceRoomId: string,floorId: string,buildingId: string,capacity: number): Conference{
        try{
            let conference = new Conference()
            conference.conferenceRoomId = conferenceRoomId
            conference.floorId = floorId
            conference.buildingId = buildingId
            conference.capacity = capacity
            this.conferences.push(conference)
            console.log('ConferenceRepository | Successfully added conference')
            return conference
        }catch(error){
            console.error('ConferenceRepository | Error | While adding conference')
            throw error
        }
    }

    listConferencesBySlot(slotTime: string,floorId: string,buildingId: string): string[]{
        try{
            let slotTimeNo = slotTime.split('-').map((value)=>Number(value))
            let result: string[] = []
            this.conferences.forEach((conference)=>{
                if(!(conference.floorId == floorId && conference.buildingId == buildingId)) {
                    conference.bookedSlots.forEach((slot)=>{
                        if(!(slot.startTime==slotTimeNo[0] && slot.endTime==slotTimeNo[1]) && ((slot.startTime>slotTimeNo[0] && slot.startTime>slotTimeNo[1]) || (slot.endTime<slotTimeNo[0] && slot.endTime<slotTimeNo[1])))
                            result.push(conference.conferenceRoomId)
                    })
                }
                    
            })
            return result
        }catch(error){
            console.error('ConferenceRepository | Error | While listConferencesBySlot')
            throw error
        }
    }

    listConferencesBySlotAndCapacity(slotTime: string,floorId: string,buildingId: string,capacity: number): string[]{
        try{ 
            let slotTimeNo = slotTime.split('-').map((value)=>Number(value))   
            let result: string[] = []
            this.conferences.forEach((conference)=>{
                if(!(conference.floorId == floorId && conference.buildingId == buildingId && conference.capacity >= capacity)){
                    conference.bookedSlots.forEach((slot)=>{
                        if(!(slot.startTime==slotTimeNo[0] && slot.endTime==slotTimeNo[1]) && ((slot.startTime>slotTimeNo[0] && slot.startTime>slotTimeNo[1]) || (slot.endTime<slotTimeNo[0] && slot.endTime<slotTimeNo[1])))
                            result.push(conference.conferenceRoomId)
                    })
                }
            })
            return result
        }catch(error){
            console.error('ConferenceRepository | Error | While listConferencesBySlotAndCapacity')
            throw error
        }
    }

    deleteConference(){

    }

    listConferences(): Conference[]{
        try{
            return this.conferences
        }catch(error){
            console.error('ConferenceRepository | Error | While listing conferences')
            throw error
        }
    }

    updateConferenceBookedSlot(slotTime: string,conferenceId: string,floorId: string,buildingId: string): Conference|undefined{
        try{
            let slotTimeNo = slotTime.split('-').map((value)=>Number(value)) 
            let conferenceUpdate;
            this.conferences.forEach((conference)=>{
                if(conference.conferenceRoomId == conferenceId && conference.floorId == floorId && conference.buildingId == buildingId){
                    let slot = new Slot
                    slot.startTime = slotTimeNo[0]
                    slot.endTime = slotTimeNo[1]
                    conference.bookedSlots.push(slot)
                    conferenceUpdate = conference
                }
            })
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
            this.conferences.forEach((conference)=>{
                if(conference.conferenceRoomId == conferenceId && conference.floorId == floorId && conference.buildingId == buildingId){
                    let slots = conference.bookedSlots.filter((slot)=>{
                        if(!(slot.startTime==slotTimeNo[0] && slot.endTime==slotTimeNo[1])){
                            return slot
                        }
                    })
                    conference.bookedSlots = [...slots]
                    conferenceCancelled = conference
                }    
            })
            console.log('ConferenceRepository | Successfully cancelled conference booked slot')
            return conferenceCancelled
        }catch(error){
            console.error('ConferenceRepository | Error | While cancelling conference booked slot')
            throw error
        }
    }

    
}