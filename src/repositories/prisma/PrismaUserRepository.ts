import { Prisma, PrismaClient, User } from "@prisma/client";
import { UserRepository } from "../UserRepository";


export class PrismaUserRepository implements UserRepository {

    private db: PrismaClient;

    public constructor(db: PrismaClient) {
        this.db = db;
    }
    public async findById(userId: string): Promise<User | null> {
        return await this.db.user.findUnique({ where: { id: userId } });
    }

    public async findByEmail(email: string): Promise<User | null> {
        return await this.db.user.findUnique({ where: { email } });
    }

    public async insert(data: Prisma.UserCreateInput): Promise<User> {
        return await this.db.user.create({ data });
    }
}