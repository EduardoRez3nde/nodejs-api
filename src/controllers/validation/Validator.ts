import { z, ZodSchema } from "zod";

export class Validator {

    public static fullUserAttibutes = z.object({
        id: z.string(),
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    });

    public static registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    public static authenticateUserSchema = z.object({
        email: z.string(),
        password: z.string().min(6),
    });

    public static profileUserSchema = z.object({
        id: z.string(),
    });

    public static userProfileSchema = Validator.fullUserAttibutes.pick({
        id: true,
        name: true,
        email: true,
    });
    
    public static validate<T> (schema: ZodSchema<T>, data: unknown): T {
        return schema.parse(data);
    }
}




