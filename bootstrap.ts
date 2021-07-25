import { Application } from "https://deno.land/x/oak@v7.5.0/mod.ts";
import { config } from "https://deno.land/x/dotenv@v2.0.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { fsExistsSync } from "https://raw.githubusercontent.com/sandbox-space/deno-helpers/main/mod.ts";
import { router } from "./router.ts"
import { MiddlewareContext } from "./types.ts"
import * as middlewares from "./middlewares.ts"

if (fsExistsSync('.env')) {
  config({ export: true });
}

const app = new Application<MiddlewareContext>();
app.use(oakCors());
app.use(middlewares.loggerMiddleware());
app.use(middlewares.timingMiddleware());
app.use(middlewares.requestIdMiddleware());
app.use(middlewares.errorMiddleware());

const JWT_SECRET = Deno.env.get('JWT_SECRET') as string;
app.use(middlewares.jwtHeaderMiddleware(JWT_SECRET));

app.use(router.routes());
app.use(router.allowedMethods());

export { app };