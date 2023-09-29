import { Conference } from "./conference"

export class Slot{
    slotTime: string
    //dateOfBooking : later
    constructor(
        slotTime: string){

        this.slotTime = slotTime
    }
}