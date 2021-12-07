import { Middleware } from "../deps.ts";
import { MiddlewareContext } from "./../types.ts";

const timingMiddleware = (): Middleware => {
  return async (context: MiddlewareContext, next: () => Promise<unknown>) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    context.response.headers.set("X-Response-Time", `${ms}ms`);
  }
};

export { timingMiddleware };