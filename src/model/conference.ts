import { Slot } from "./slot"

export class Conference{
    conferenceRoomId: string = ''
    capacity: number = 0
    bookedSlots: Slot[] = []
    floorId: string = ''
    buildingId: string = ''
}