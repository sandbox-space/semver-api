import { httpErrors, Middleware } from "../deps.ts";
import { verify } from "../deps.ts"
import { MiddlewareContext, AuthRepository } from "./../types.ts";
import { JwtHeader } from "../config/jwt.config.ts" 

const jwtHeaderMiddleware = (secretJWT: string): Middleware => {
  return async (context: MiddlewareContext, next: () => Promise<unknown>) => {
    const authHeader = context.request.headers.get("Authorization");
    try {
      if (authHeader !== null) {
        const token = authHeader.replace(/^bearer/i, "").trim();
        const payload = await verify(token, secretJWT, JwtHeader.alg);
        context.authRepository = payload.repository as AuthRepository;
      }
    } catch (error) {
      console.error(`JWT verify failed: ${error.toString()}`);
      throw new httpErrors.BadRequest("JWT token verify failed");
    }

    await next();
  };

}

export { jwtHeaderMiddleware };
