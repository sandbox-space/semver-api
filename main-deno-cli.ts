import { app } from "./bootstrap.ts";

// Deno Cli
console.log('Running');
await app.listen({ port: 8080 });
