
import {Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm"; 
import { Floor } from "../model/floor";

@Entity({name: 'building_db'})
export class BuildingDb {
    @PrimaryColumn()
    buildingId!: string

    @Column('int',{array: true, nullable: true})
    //@ManyToOne(()=>Floor,(floor: Floor)=>floor.floorId)
    floorId!: []
}