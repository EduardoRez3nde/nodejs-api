import { Prisma, User } from "@prisma/client";

export interface UserRepository {

    findById(userId: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    insert(User: Prisma.UserCreateInput): Promise<User>;
}