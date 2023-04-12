import { config } from 'dotenv'

import express from 'express'
import { GetUsersControllers } from './controllers/get-users/get-users'
import { MongoGetUsersRepositories, PostgresGetUsersRepositories } from './repositories/get-users/mongo-get-users'
import { MongoClient } from './database/mongo'
import { MongoCreateUserRepository } from './repositories/create-users/mongo-create-user'
import { CreateUserController } from './controllers/create-user/create-user'

const main = async () => {
    config()
    
    const app = express()

    app.use(express.json())

    await MongoClient.connect()

    app.get('/users', async (req, res) => {
        const mongoGetUsersRepository = new MongoGetUsersRepositories()
        //const postgresGetUsersRepository = new PostgresGetUsersRepositories()
        const getUsersController = new GetUsersControllers(mongoGetUsersRepository)
        //const getUsersController = new GetUsersControllers(postgresGetUsersRepository)
    
        const { body, statusCode } = await getUsersController.handle()
    
        res.status(statusCode).send(body)
    })

    app.post('/users', async (req, res) => {
        const mongoCreateUserRepository = new MongoCreateUserRepository()
        const createUserController = new CreateUserController(mongoCreateUserRepository)

        const { body, statusCode } = await createUserController.handle({
            body: req.body
        })

        res.status(statusCode).send(body)
    })
    

    const port = process.env.PORT || 8000

    app.listen(port, () => console.log(`Listening on port ${port}`))

}
 
main()