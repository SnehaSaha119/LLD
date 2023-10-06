import { slotRepository } from "../config/storage"
import { Slot } from "../model/slot";

export interface SlotServiceInterface{
    slotExists: (slotTime: string) => Boolean;
    addSlot: (slotTime: string) => Slot;
}