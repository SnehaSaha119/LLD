
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"; 
import { Building } from "../model/building";

@Entity()
export class FloorDb{
    @PrimaryGeneratedColumn()
    floorId!: string

    @OneToMany(()=>Building,(building: Building)=>building.buildingId)
    buildingId!: string
}