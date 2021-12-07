import { httpErrors, Middleware } from "../deps.ts";
import { verify } from "../deps.ts"
import { MiddlewareContext, AuthRepository } from "../types.ts";

const jwtHeaderMiddleware = (secretJWT: string): Middleware => {
  return async (context: MiddlewareContext, next: () => Promise<unknown>) => {
    const authHeader = context.request.headers.get("Authorization");
    try {
      if (authHeader !== null) {
        const token = authHeader.replace(/^bearer/i, "").trim();
        const encoder = new TextEncoder()
        const secretBuffer = encoder.encode(secretJWT);
        const key = await crypto.subtle.importKey(
          "raw",
          secretBuffer,
          { name: "HMAC", hash: "SHA-512" },
          true,
          ["sign", "verify"],
        );
        const payload = await verify(token, key);
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
