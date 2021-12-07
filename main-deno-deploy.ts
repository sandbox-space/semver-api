import { app } from "./bootstrap.ts";

// Deno Deploy
//addEventListener("fetch", app.fetchEventHandler());
console.log('Running on port 8080');
await app.listen({ port: 8080 });
