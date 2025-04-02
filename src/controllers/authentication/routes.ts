import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ControllerInit } from "../factories/ControllerInit";
import { AuthenticationController } from "./AuthenticationController";

export async function authenticationRoutes(server: FastifyInstance) {

    const authenticationInit: AuthenticationController = ControllerInit.authenticationInit();

    server.post("/sessions", (request: FastifyRequest, reply: FastifyReply) => {
        authenticationInit.authenticate(request, reply);
    });
}