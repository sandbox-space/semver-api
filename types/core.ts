import { Context as OakContext } from "../deps.ts";
import { AuthRepository } from "./auth-repository.ts";

/**
 * Custom appilication context
 */
export class MiddlewareContext extends OakContext {
  authRepository?: AuthRepository;
}
