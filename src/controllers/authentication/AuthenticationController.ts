import { FastifyReply, FastifyRequest } from "fastify";
import { AuthenticationService } from "../../services/authentication/AuthenticationService";
import { Validator } from "../validation/Validator";
import { AuthenticationResponsePorperties } from "../../services/authentication/AuthenticationResponseProperties";
import { InvalidCredentialsError } from "../../services/exceptions/InvalidCredentialsError";
import { status } from "../../utils/status/Status";


export class AuthenticationController {

    private authenticationService: AuthenticationService;

    public constructor(authenticationService: AuthenticationService) {
        this.authenticationService = authenticationService;
    }

    public async authenticate(request: FastifyRequest, reply: FastifyReply) {
        
        try {
            const validationAuth = Validator.validate(Validator.authenticateUserSchema, request.body);

            const authUser: AuthenticationResponsePorperties = await this.authenticationService.authenticate(validationAuth);

            const token = await reply.jwtSign({}, { sign: { sub: authUser.user.id } });

            const refreshToken = await reply.jwtSign(
                {},
                { 
                    sign: {
                        sub: authUser.user.id,
                        expiresIn: "7d"
                    }
                }
            )
            return reply
                .setCookie("refreshToken", refreshToken, {
                    path: "/",
                    secure: true,
                    sameSite: true,
                    httpOnly: true
                }).status(status.OK).send({ token });

        } catch(err) {
            if (err instanceof InvalidCredentialsError)
                return reply.status(401).send({ message: "Invalid credentials" });
        }
    } 

    public async refresh(request: FastifyRequest, reply: FastifyReply) {
        
        await request.jwtVerify({ onlyCookie: true });

        const token = await reply.jwtSign({}, { sign: { sub: request.user.sub } });

        const refreshToken = await reply.jwtSign(
            {}, 
            { 
                sign: { 
                    sub: request.user.sub, 
                    expiresIn: "7d" 
                } 
            }
        );
        return reply
            .setCookie("refreshToken", refreshToken, {
                path: "/",
                secure: true,
                sameSite: true,
                httpOnly: true
            }).status(status.OK).send({ token });
    }
}