import { ConnectionOptions } from 'typeorm';
import { UserDb } from '../databaseModel/userDb'
import { BuildingDb } from '../databaseModel/buildingDb';
import { FloorDb } from '../databaseModel/floorDb';
import { ConferenceDb } from '../databaseModel/conferenceDb';
import { BookingDb } from '../databaseModel/bookingDb';

 
const connectionConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'postgres',
  entities: [UserDb, BuildingDb, FloorDb, ConferenceDb, BookingDb],
  synchronize: true,
  ssl: false
};

console.log("connectionConfig : ",connectionConfig);

export default connectionConfig;