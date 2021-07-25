import { app } from "./bootstrap.ts";

// Deno Deploy
addEventListener("fetch", app.fetchEventHandler());
