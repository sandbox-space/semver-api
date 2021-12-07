import { Application } from "./deps.ts";
import { config } from "./deps.ts";
import { oakCors } from "./deps.ts";
import { fsExistsSync } from "./deps.ts";
import { router } from "./router.ts"
import { MiddlewareContext } from "./types.ts"
import * as middlewares from "./middlewares.ts"

if (fsExistsSync('.env')) {
  config({ export: true });
}

const app = new Application();
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