import express from 'express'
import { UserHandler } from './src/handler/userHandler'
import { BuildingHandler } from './src/handler/buildingHandler'
import { FloorHandler } from './src/handler/floorHandler'
import { ConferenceHandler } from './src/handler/conferenceHandler'
import { BookingHandler } from './src/handler/bookingHandler'
import { SlotHandler } from './src/handler/slotHandler'
import { createConnection } from 'typeorm';
import connectionConfig from './src/config/ormConfig'

const PORT = 8001
const app = express()
app.use(express.json())
app.use(new UserHandler().router)
app.use(new BuildingHandler().router)
app.use(new FloorHandler().router)
app.use(new ConferenceHandler().router)
app.use(new BookingHandler().router)
app.use(new SlotHandler().router)

const init = async() =>{
    app.listen(PORT,async ()=>{
        console.log("Conference Management System at port : ",PORT)

        try {
            await createConnection(connectionConfig);
            console.log("Database successfully connected")
          } catch (error) {
            console.log('Error while connecting to the database', error);
            return error;
          }
    })
}

init()