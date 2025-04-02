import { User } from "@prisma/client"
import { hash } from "bcryptjs";
import { UserRepository } from "../../repositories/UserRepository";
import { ResourceAlreadyExistsError } from "../exceptions/ResourceAlreadyExistsError";
import { RegisterUserRequestProperties } from "./RegisterUserRequestProperties";
import { GetUserProfileProperties } from "./GetUserProfileProperties";
import { ResourceNotFound } from "../exceptions/ResourceNotFound";


export class UserService {

    private userRepository: UserRepository;

    public constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async insert(user: RegisterUserRequestProperties): Promise<User> {
                
        const existEmail: User | null = await this.userRepository.findByEmail(user.email);

        if (existEmail) throw new ResourceAlreadyExistsError("User already exists");
        
        user.password = await hash(user.password, 5);

        return this.userRepository.insert(user);
    } 

    public async findById(id: GetUserProfileProperties): Promise<User> {

        const user: User | null = await this.userRepository.findById(id.userId);

        if (!user) 
            throw new ResourceNotFound("Resource not Found");

        return user;
    }
}