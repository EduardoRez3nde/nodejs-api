

export class ResourceNotFound extends Error {

    public constructor(message: string) {
        super(message);
        this.name = "ResourceNotFound";
    }
}