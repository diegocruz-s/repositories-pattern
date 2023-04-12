import validator from 'validator'
import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import { CreateUserParams, ICreateUserController, ICreateUserRepository } from "./protocols";

export class CreateUserController implements ICreateUserController {
    createUserRepository: ICreateUserRepository

    constructor (createUserRepository: ICreateUserRepository) {
        this.createUserRepository = createUserRepository
    }

    async handle(httpResquest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
        try {
            const requiredFields = ['firstName', 'lastName', 'email', 'password']

            for (const field of requiredFields) {
                if(!httpResquest?.body?.[field as keyof CreateUserParams]?.length) {
                    return {
                        statusCode: 400,
                        body: `Field ${field} is required`
                    }
                }
            }

            const emailIsValid = validator.isEmail(httpResquest.body!.email)

            if(!emailIsValid) {
                return {
                    statusCode: 400,
                    body: `Email is invalid`
                }
            }

            if(!httpResquest.body) {
                return {
                    statusCode: 400, 
                    body: 'Please specify a body'
                }
            }
            
    
            const user = await this.createUserRepository.createUser(httpResquest.body)

            return {
                statusCode: 201,
                body: user
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: 'Something went wrong'
            }
        }
    }

}