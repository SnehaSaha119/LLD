import { Slot } from "../model/slot";
import { RepositoryDataManipulation } from "../repository/repositoryDataManipulation";

export class SlotService {
    repositoryDataManipulation: RepositoryDataManipulation
    constructor(repositoryDataManipulation : RepositoryDataManipulation){
        this.repositoryDataManipulation = repositoryDataManipulation
    }

    slotExists(slotTime: string) {

        let slotList = this.repositoryDataManipulation.listSlots()
        let flag = false
        slotList.filter((value: Slot) => {
            if (value.slotTime == slotTime) 
                flag = true
        })

        return flag ? true : false
    }

    addSlot(slotTime: string) {

        this.repositoryDataManipulation.addSlot(slotTime)

        return 'Successfully added slot'
    }
}