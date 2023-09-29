import { Floor } from "../model/floor";
import { RepositoryDataManipulation } from "../repository/repositoryDataManipulation";

export class FloorService {
    repositoryDataManipulation: RepositoryDataManipulation
    constructor(repositoryDataManipulation : RepositoryDataManipulation){
        this.repositoryDataManipulation = repositoryDataManipulation
    }

    floorExists(floorId: string, buildingId: string) {

        let floorList = this.repositoryDataManipulation.listFloors()
        let flag = false
        floorList.filter((value: Floor) => {
            if (value.buildingId == buildingId  && value.floorId==floorId) 
                flag = true
        })

        return flag ? true : false
    }

    addFloor(floorId: string,buildingId: string) {

        this.repositoryDataManipulation.addFloor(floorId,buildingId)

        return 'Successfully added floor'
    }
}