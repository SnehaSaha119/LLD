import { Slot } from "../model/slot";
import { slotRepository } from "../config/storage"
import { SlotServiceInterface } from "../interface/slotServiceInterface";

export class SlotService implements SlotServiceInterface {
    slotRepository = slotRepository

    slotExists(slotTime: string): Boolean {
        let slotTimeNo = slotTime.split('-').map((value)=>Number(value))
        let slotList = this.slotRepository.listSlots()
        let slotFound = false
        slotList.filter((value: Slot) => {
            if (value.startTime == slotTimeNo[0] && value.endTime == slotTimeNo[1]) 
                slotFound = true
        })

        return slotFound
    }

    addSlot(slotTime: string): Slot {
        let slotTimeNo = slotTime.split('-').map((value)=>Number(value))
        let slotTimeReceived = this.slotRepository.addSlot(slotTimeNo[0],slotTimeNo[1])

        return slotTimeReceived
    }
}