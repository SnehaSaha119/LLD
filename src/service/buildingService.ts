import { Building } from "../model/building";
import { RepositoryDataManipulation } from "../repository/repositoryDataManipulation";

export class BuildingService {
    repositoryDataManipulation: RepositoryDataManipulation
    constructor(repositoryDataManipulation : RepositoryDataManipulation){
        this.repositoryDataManipulation = repositoryDataManipulation
    }

    buildingExists(buildingId: string) {

        let buildingList = this.repositoryDataManipulation.listBuildings()
        let flag = false
        buildingList.filter((value: Building) => {
            if (value.buildingId == buildingId) 
                flag = true
        })

        return flag ? true : false
    }

    addBuilding(buildingId: string) {

        this.repositoryDataManipulation.addBuilding(buildingId)

        return 'Successfully added building'
    }
}