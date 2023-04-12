import validator from 'validator'
import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";
import { badRequest, created, serverError } from '../helpers';

export class CreateUserController implements IController {
    createUserRepository: ICreateUserRepository

    constructor (createUserRepository: ICreateUserRepository) {
        this.createUserRepository = createUserRepository
    }

    async handle(httpResquest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User | string>> {
        try {
            const requiredFields = ['firstName', 'lastName', 'email', 'password']

            for (const field of requiredFields) {
                if(!httpResquest?.body?.[field as keyof CreateUserParams]?.length) {
                    return badRequest(`Field ${field} is required`)
                }
            }

            const emailIsValid = validator.isEmail(httpResquest.body!.email)

            if(!emailIsValid) {
                return badRequest(`Email is invalid`)
            }

            if(!httpResquest.body) {
                return {
                    statusCode: 400, 
                    body: 'Please specify a body'
                }
            }
            
            const user = await this.createUserRepository.createUser(httpResquest.body)

            return created<User>(user)
        } catch (error) {
            return serverError()
        }
    }

}