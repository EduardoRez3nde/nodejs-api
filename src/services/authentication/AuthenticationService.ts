import { User } from "@prisma/client";
import { UserRepository } from "../../repositories/UserRepository";
import { AuthenticationRequestPorperties } from "./AuthenticationRequestProperties";
import { AuthenticationResponsePorperties } from "./AuthenticationResponseProperties";
import { InvalidCredentialsError } from "../exceptions/InvalidCredentialsError";
import { compare } from "bcryptjs";

export class AuthenticationService {

    private userRepository: UserRepository;

    public constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async authenticate(credentials: AuthenticationRequestPorperties): Promise<AuthenticationResponsePorperties> {

        const user: User | null = await this.userRepository.findByEmail(credentials.email);

        if (!user) 
            throw new InvalidCredentialsError("User does not exists");

        const doesPasswordMatches: boolean = await compare(credentials.password, user.password);

        if (!doesPasswordMatches)
            throw new InvalidCredentialsError("Incorrect Password");

        return { user };
    }
}