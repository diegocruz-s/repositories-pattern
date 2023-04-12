import { User } from "../../models/user";
import { IController } from "../protocols";
import { IGetUsersRepository } from "./protocols";

export class GetUsersControllers implements IController {
    getUsersRepository: IGetUsersRepository
    
    constructor(getUsersRepository: IGetUsersRepository){
        this.getUsersRepository = getUsersRepository
    }

    // posso resumir tudo isso para isso:
    // constructor(private readonly getUsersRepository: IGetUsersRepository) {}
    
    async handle() {
        // validar requisição
        //direcionar chamada ao repository

        try {
            const users = await this.getUsersRepository.getUsers()
            return {
                statusCode: 200,
                body: users 
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Something went wrong'
            }
        }


    }
}