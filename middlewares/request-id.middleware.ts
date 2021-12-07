import { Middleware } from "../deps.ts";
import { uuid } from "../deps.ts";
import { MiddlewareContext } from "../types.ts";

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