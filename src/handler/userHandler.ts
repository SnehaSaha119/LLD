import express, { Request, Response } from 'express'
import { UserService } from '../service/userService'

export class UserHandler {
    public router = express.Router()
    userService: UserService
    constructor() {
        this.router.post('/users', this.addUser)
        this.router.get('/users', this.getUsers)
        this.userService = new UserService()
    }

    addUser = async (req: Request, res: Response) => {

        try {
            
            let userId = req?.body?.userId
            
            if (!userId) {
                return res.status(400).send({
                    Status: 400,
                    Message:'Missing userId',
                    data: userId
                })
            }

            if(this.userService.isUserExists(userId)){
                return res.status(400).send({
                    Status: 400,
                    Message:'User already exists',
                    data: userId
                })      
            }
            
            let result = this.userService.addUser(userId)       
            console.log(` -- Added user ${JSON.stringify(result)}`)

            return res.status(201).send({
                Status: 201,
                Message:'User added',
                data: result
            }) 

        } catch (error) {
            console.error("Error | ",error)
            return res.status(500).send({
                Status: 500,
                Message:'Internal Server Error'
            })
        }

    }

    getUsers = async (req: Request, res: Response) => {

        try {
            
            let result = this.userService.listUsers()       
            console.log(` -- Listed users ${result}`)

            res.status(201).send({
                Status: 201,
                Message:'User list',
                Data: result
            }) 

        } catch (error) {
            console.error("Error | ",error)
            res.status(500).send({
                Status: 500,
                Message:'Internal Server Error'
            })
        }

    }
}
