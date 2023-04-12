import { config } from 'dotenv'

import express from 'express'
import { GetUsersControllers } from './controllers/get-users/get-users'
import { MongoGetUsersRepositories, PostgresGetUsersRepositories } from './repositories/get-users/mongo-get-users'
import { MongoClient } from './database/mongo'

const main = async () => {
    config()
    
    const app = express()

    await MongoClient.connect()

    app.get('/users', async (req, res) => {
        const mongoGetUsersRepository = new MongoGetUsersRepositories()
        //const postgresGetUsersRepository = new PostgresGetUsersRepositories()
        const getUsersController = new GetUsersControllers(mongoGetUsersRepository)
        //const getUsersController = new GetUsersControllers(postgresGetUsersRepository)
    
        const { body, statusCode } = await getUsersController.handle()
    
        res.send(body).status(statusCode)
    })
    

    const port = process.env.PORT || 8000

    app.listen(port, () => console.log(`Listening on port ${port}`))

}
 
main()