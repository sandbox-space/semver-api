import { Middleware } from "https://deno.land/x/oak@v7.5.0/mod.ts";
import { MiddlewareContext } from "./../types.ts";
import { v4 as uuid } from "https://deno.land/std@0.102.0/uuid/mod.ts";

const requestIdMiddleware = (): Middleware => {
  return async (context: MiddlewareContext, next: () => Promise<unknown>) => {
    let requestId = context.request.headers.get("X-Response-Id");
    if (!requestId) {
      /** if request id not being set, set unique request id */
      requestId = uuid.generate();
      /* doesn't work on deno deploy */
      //context.request.headers.set("X-Response-Id", requestId.toString());
    }
    await next();
    /** add request id in response header */
    context.response.headers.set("X-Response-Id", requestId);
  }
};

export { requestIdMiddleware };