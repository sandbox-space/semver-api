import { isHttpError, Status, Middleware } from "../deps.ts";
import { MiddlewareContext } from "./../types.ts";

const errorMiddleware = (): Middleware => {
  return async (context: MiddlewareContext, next: () => Promise<unknown>) => {
    try {
      await next();
    } catch (err) {
      let message = err.message;
      const status = err.status || err.statusCode || Status.InternalServerError;
      const ENV = Deno.env.get('ENV') as string;

      /**
       * considering all unhandled errors as internal server error,
       * do not want to share internal server errors to 
       * end user in non "development" mode
       */
      if (!isHttpError(err)) {
        message = ENV === "dev" || ENV === "development"
          ? message
          : "Internal Server Error";
      }

      console.error(err);

      context.response.status = status;
      //context.response.body = { status, message };
      context.response.body = [];
    }
  }
};

export { errorMiddleware };
