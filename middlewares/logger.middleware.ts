import { Middleware } from "https://deno.land/x/oak@v7.5.0/mod.ts";
import { MiddlewareContext } from "./../types.ts";

const loggerMiddleware = (): Middleware => {
  return async (context: MiddlewareContext, next: () => Promise<unknown>) => {
    await next();
    const reqTime = context.response.headers.get("X-Response-Time");
    const reqId = context.response.headers.get("X-Response-Id");
    const status = context.response.status;
    console.log(
      `${reqId}@${context.request.ip} ${context.request.method} ${context.request.url} - ${reqTime} status: ${status}`,
    );
  }
};

export { loggerMiddleware };