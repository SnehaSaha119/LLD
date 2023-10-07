
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm"; 
import { Floor } from "../model/floor";

@Entity()
export class BuildingDb {
    @PrimaryGeneratedColumn()
    buildingId!: string

    // @Column()
    @ManyToOne(()=>Floor,(floor: Floor)=>floor.floorId)
    floorId!: []
}