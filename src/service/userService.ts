import { User } from "../model/user";
import { RepositoryDataManipulation } from "../repository/repositoryDataManipulation";

export class UserService {
    repositoryDataManipulation: RepositoryDataManipulation
    constructor(repositoryDataManipulation : RepositoryDataManipulation){
        this.repositoryDataManipulation = repositoryDataManipulation
    }

    userExists(userId: string) {

        let userList = this.repositoryDataManipulation.listUsers()
        let flag = false
        userList.filter((value: User) => {
            if (value.userId == userId) 
                flag = true
        })

        return flag ? true : false
    }

    addUser(userId: string) {

        this.repositoryDataManipulation.addUser(userId)

        return 'Successfully added user'
    }
}