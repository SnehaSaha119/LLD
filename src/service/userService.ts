import { User } from "../model/user";
import { userRepository } from "../config/storage";

export class UserService {
    userRepository = userRepository

    isUserExists(userId: string): Boolean {
        try{
            let userList = this.userRepository.listUsers()
            let userFound = false
            userList.find((value: User) => {
                if (value.userId == userId) 
                    userFound = true
            })
            return userFound
        }catch(error){
            console.error('UserService | Error | While checking user exists')
            throw error
        }
    }

    addUser(userId: string): User {
        try{
            let userReceived = this.userRepository.addUser(userId)
            console.log('UserService | Successfully added user')
            return userReceived
        }catch(error){
            console.error('UserService | Error | While adding user')
            throw error
        }
    }

    listUsers(): User[]{
        try{
            let usersReceived = this.userRepository.listUsers()
            console.log('UserService | Successfully listed user')
            return usersReceived
        }catch(error){
            console.error('UserService | Error | While listing user')
            throw error
        }
    }
}