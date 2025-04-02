import { FastifyReply, FastifyRequest } from "fastify";
import { status } from "../utils/status/Status";

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify();
    } catch(err) {
        return reply.status(status.UNAUTHORIZED).send({ message: "Unauthorized" })
    }
}