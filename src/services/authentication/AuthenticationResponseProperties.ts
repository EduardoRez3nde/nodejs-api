import { User } from "@prisma/client";

export interface AuthenticationResponsePorperties {
    user: User;
}
