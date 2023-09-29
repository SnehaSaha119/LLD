import { Conference } from "../model/conference";
import { RepositoryDataManipulation } from "../repository/repositoryDataManipulation";

export class ConferenceService {
    repositoryDataManipulation: RepositoryDataManipulation
    constructor(repositoryDataManipulation : RepositoryDataManipulation){
        this.repositoryDataManipulation = repositoryDataManipulation
    }

    conferenceExists(conferenceRoomId: string,floorId: string, buildingId: string) {

        let conferenceList = this.repositoryDataManipulation.listConferences()
        let flag = false
        conferenceList.filter((value: Conference) => {
            if (value.conferenceRoomId == conferenceRoomId  && value.floorId==floorId && value.buildingId) 
                flag = true
        })

        return flag ? true : false
    }

    addConference(conferenceRoomId: string,floorId: string,buildingId: string) {

        this.repositoryDataManipulation.addConference(conferenceRoomId,floorId,buildingId)

        return 'Successfully added conference'
    }

    listConferencesBySlot(slotTime: string,floorId: string,buildingId: string) {

        let result = this.repositoryDataManipulation.listConferencesBySlot(slotTime,floorId,buildingId)

        return result
    }
}