import { Slot } from "../model/slot"

export class SlotRepository{
    private slots: Slot[] = []

    addSlot(slotStartTime: number,slotEndTime: number): Slot{
        let slot = new Slot
        slot.startTime = slotStartTime
        slot.endTime = slotEndTime
        this.slots.push(slot)

        return slot
    }

    deleteSlot(){

    }

    listSlots(): Slot[]{
        return this.slots
    }
}