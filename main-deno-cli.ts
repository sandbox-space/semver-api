import { app } from "./bootstrap.ts";

// Deno Cli
console.log('Running on port 8080');
await app.listen({ port: 8080 });
