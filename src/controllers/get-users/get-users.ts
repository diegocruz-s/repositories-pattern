import { User } from "../../models/user";
import { ok, serverError } from "../helpers";
import { HttpResponse, IController } from "../protocols";
import { IGetUsersRepository } from "./protocols";

export class GetUsersControllers implements IController {
    getUsersRepository: IGetUsersRepository
    
    constructor(getUsersRepository: IGetUsersRepository){
        this.getUsersRepository = getUsersRepository
    }

    // posso resumir tudo isso para isso:
    // constructor(private readonly getUsersRepository: IGetUsersRepository) {}
    
    async handle(): Promise<HttpResponse<User[] | string>> {
        // validar requisição
        //direcionar chamada ao repository

        try {
            const users = await this.getUsersRepository.getUsers()
            return ok<User[]>(users)
        } catch (error) {
            return serverError()
        }
    }
}