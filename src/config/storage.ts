import { BookingRepository } from "../repository/bookingRepository";
import { BuildingRepository } from "../repository/buildingRepository";
import { ConferenceRepository } from "../repository/conferenceRepository";
import { FloorRepository } from "../repository/floorRepository";
import { SlotRepository } from "../repository/slotRepository";
import { UserRepository } from "../repository/userRepository";

export const userRepository = new UserRepository
export const buildingRepository = new BuildingRepository
export const floorRepository = new FloorRepository
export const conferenceRepository = new ConferenceRepository
export const bookingRepository = new BookingRepository
export const slotRepository = new SlotRepository