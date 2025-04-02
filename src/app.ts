import Fastify, { fastify, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { status } from "./utils/status/Status";
import { env } from "./env/validation";
import { userRoutes } from "./controllers/user/routes";
import { ResourceAlreadyExistsError } from "./services/exceptions/ResourceAlreadyExistsError";
import { InvalidCredentialsError } from "./services/exceptions/InvalidCredentialsError";
import { authenticationRoutes } from "./controllers/authentication/routes";
import { fastifyJwt } from "@fastify/jwt";
import { ResourceNotFound } from "./services/exceptions/ResourceNotFound";
import fastifyCookie from "@fastify/cookie";

export const app: FastifyInstance = Fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: "10m"
    }
});

app.register(fastifyCookie);

app.register(userRoutes);
app.register(authenticationRoutes);

app.setErrorHandler((error: Error, request: FastifyRequest, reply: FastifyReply) => {
    
    if (error instanceof ZodError) {
        return reply.status(status.BAD_REQUEST).send({
            message: "Validation Error",
            details: error.format()
        });
    }

    if (error instanceof ResourceAlreadyExistsError) {
        return reply.status(status.CONFLICT).send({
            message: "Email already exists",
            details: error.message
        });
    }

    if (error instanceof InvalidCredentialsError) {
        return reply.status(status.UNAUTHORIZED).send({
            message: "Invalid Credentials",
            details: error.message
        });
    }

    if (error instanceof ResourceNotFound) {
        return reply.status(status.NOT_FOUND).send({
            message: "Resource not found",
            details: error.message
        });
    }

    if (env.NODE_ENV === "development") {
        console.error("❌ Unexpected Error:", error);
    }

    return reply.status(status.INTERNAL_SERVER_ERROR).send({
        message: "Internal Server Error"
    });
});