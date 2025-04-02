import { UserService } from "../../services/user/UserService";
import { FastifyReply, FastifyRequest } from "fastify";
import { Validator } from "../validation/Validator";
import { User } from "@prisma/client";
import { status } from "../../utils/status/Status";


export class UserController {

    private userService: UserService;

    public constructor(userService: UserService) {
        this.userService = userService;
    }

    public async insert(request: FastifyRequest, reply: FastifyReply): Promise<User> {
        
        const validationUser = Validator.validate(Validator.registerBodySchema, request.body);

        const user: User = await this.userService.insert(validationUser);

        return reply.status(status.CREATED).send(user);
    }

    public async getProfile(request: FastifyRequest, reply: FastifyReply): Promise<User> {

        const user: User = await this.userService.findById({ userId: request.user.sub });

        const validUser = Validator.validate(Validator.userProfileSchema, user);

        return reply.status(status.OK).send(validUser);
    }
}