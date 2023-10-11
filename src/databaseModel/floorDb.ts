
import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm"; 
import { Building } from "../model/building";
import { BuildingDb } from "./buildingDb";

@Entity({name: 'floor_db'})
export class FloorDb{
    @PrimaryColumn()
    floorId!: string

    @ManyToOne(()=>BuildingDb,(building: BuildingDb)=>building.buildingId)
    buildingId!: string
}