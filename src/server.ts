import { env } from "./env/validation";
import { app } from "./app";

app.listen({
    port: env.PORT, 
    host: "0.0.0.0"
}).then(() => {
    console.log(`Server is running on port ${env.PORT}`);
});