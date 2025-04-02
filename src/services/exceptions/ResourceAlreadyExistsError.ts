

export class ResourceAlreadyExistsError extends Error {

    public constructor(message: string) {
        super(message);
        this.name = "ResourceAlreadyExistsError";
    }
}