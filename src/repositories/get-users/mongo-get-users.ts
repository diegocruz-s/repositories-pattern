import { IGetUsersRepository } from "../../controllers/get-users/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoGetUsersRepositories implements IGetUsersRepository {
    async getUsers(): Promise<User[]> {
        const users = await MongoClient.db.collection<User>('users').find({}).toArray()

        return [{
            id: '',
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
            id: '',
            firstName: 'Diego P.',
            lastName: 'Cruz',
            email: 'diego@gmail.com',
            password: 'Diego@123'
        }]
    }
}