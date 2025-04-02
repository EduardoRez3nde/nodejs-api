import { PrismaUserRepository } from "../../repositories/prisma/PrismaUserRepository";
import { UserRepository } from "../../repositories/UserRepository";
import { UserService } from "../../services/user/UserService";
import { UserController } from "../user/UserController";
import { prisma } from "../../database/PrismaDatabase";
import { AuthenticationService } from "../../services/authentication/AuthenticationService";
import { AuthenticationController } from "../authentication/AuthenticationController";

export class ControllerInit {

    public static userInit() {
        const userRepository: UserRepository = new PrismaUserRepository(prisma);
        const userService: UserService = new UserService(userRepository);
        return new UserController(userService);
    }

    public static authenticationInit() {
        const userRepository: UserRepository = new PrismaUserRepository(prisma);
        const authenticationService: AuthenticationService = new AuthenticationService(userRepository);
        return new AuthenticationController(authenticationService);
    }
}