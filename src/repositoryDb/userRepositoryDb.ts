import { getConnection, getRepository } from "typeorm";
import { User } from "../model/user";
import { UserDb } from "../databaseModel/userDb";
import connectionConfig from "../config/ormConfig";


export class UserRepositoryDb {

    async addUser(userId: string):Promise<UserDb>{
        try{
             let userAdded = await getRepository(UserDb).save({userId: userId})
             console.log('UserRepository | Successfully added user',JSON.stringify(userAdded)) 
             return userAdded
        }catch(error){
            console.error('serRepository | Error | While adding user')
            throw error
        }
    }

    deleteUser(){

    }

    async listUsers():Promise<UserDb[]>{
        try{

            let usersListed = await getRepository(UserDb).find()
            console.log('UserRepository | Successfully listed users',JSON.stringify(usersListed))
            return usersListed
            
        }catch(error){
            console.error('UserRepository | Error | While listing users')
            throw error
        }
    }

    async listUser(userId: string): Promise<UserDb | null>{
        try{

            let userListed = await getRepository(UserDb).findOne({
                select: ['userId'],
                where: {
                    userId
                }
            })
            
            console.log('UserRepository | Successfully listed users', JSON.stringify(userListed))
            return userListed
            
        }catch(error){
            console.error('UserRepository | Error | While listing users')
            throw error
        }
    }

}