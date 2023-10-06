import { User } from "../model/user"
import { UserRepository } from "../repository/userRepository"

export interface UserServiceInterface{
    isUserExists(userId: string): Boolean
    addUser(userId:string): User
    listUsers(): User[]
}
