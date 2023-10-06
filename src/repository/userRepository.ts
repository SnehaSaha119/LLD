import { User } from "../model/user";

export class UserRepository {
    private users : User[] = []

    addUser(userId: string): User{
        try{
            let user = new User(userId)
            this.users.push(user)
            console.log('UserRepository | Successfully added user')
            return user
        }catch(error){
            console.error('UserRepository | Error | While adding user')
            throw error
        }
    }

    deleteUser(){

    }

    listUsers(): User[]{
        try{
            console.log('UserRepository | Successfully listed users')
            return this.users
        }catch(error){
            console.error('UserRepository | Error | While listing users')
            throw error
        }
    }

}