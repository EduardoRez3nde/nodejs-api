import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "./UserController";
import { ControllerInit } from "../factories/ControllerInit";
import { verifyJWT } from "../../middleware/VerifyJwt";


export async function userRoutes(server: FastifyInstance) {

    const userController: UserController = ControllerInit.userInit();

    server.post("/users", (request: FastifyRequest, reply: FastifyReply) => 
        userController.insert(request, reply));

    server.get("/me", { onRequest: [verifyJWT] }, (request: FastifyRequest, reply: FastifyReply) => 
        userController.getProfile(request, reply));
}