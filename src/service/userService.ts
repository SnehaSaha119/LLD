import { UserDb } from "../databaseModel/userDb";
import { User } from "../model/user";
import { UserRepositoryDb } from "../repositoryDb/userRepositoryDb";

export class UserService {
    userRepository = new UserRepositoryDb()

    async isUserExists(userId: string): Promise<boolean>{
        try{
            let userList = await this.userRepository.listUser(userId)
            console.log('UserService | Successfully listed existing user', JSON.stringify(userList))
            
            return (userList) ? true : false
        }catch(error){
            console.error('UserService | Error | While checking user exists')
            throw error
        }
    }

    async addUser(userId: string):Promise<UserDb>{
        try{
            let userAdded = await this.userRepository.addUser(userId)
                
            console.log('UserService | Successfully added user',JSON.stringify(userAdded))
            return userAdded
        }catch(error){
            console.error('UserService | Error | While adding user')
            throw error
        }
    }

    async listUsers():Promise<UserDb[]>{
        try{
            let userList = await this.userRepository.listUsers()
            console.log('UserService | Successfully listed user',JSON.stringify(userList))
            return userList
        }catch(error){
            console.error('UserService | Error | While listing user')
            throw error
        }
    }
}