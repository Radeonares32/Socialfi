import { UserDal } from '../Dal/user.dal'

export class UserService {
    private userDataAccess:UserDal = new UserDal()
    findAll() {
        return {
            user:this.userDataAccess.findAll()
        }
    }
    find(id:string) {
        return {
            user:this.userDataAccess.find(id)
        }
    }
}