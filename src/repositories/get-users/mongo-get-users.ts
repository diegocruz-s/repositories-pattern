import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/user";

export class MongoGetUsersRepositories implements IGetUsersRepository {
    async getUsers(): Promise<User[]> {
        return [{
            firstName: 'Diego M.',
            lastName: 'Cruz',
            email: 'diego@gmail.com',
            password: 'Diego@123'
        }]
    }
}

export class PostgresGetUsersRepositories implements IGetUsersRepository {
    async getUsers(): Promise<User[]> {
        return [{
            firstName: 'Diego P.',
            lastName: 'Cruz',
            email: 'diego@gmail.com',
            password: 'Diego@123'
        }]
    }
}