import { helpers, httpErrors } from "../deps.ts";
import { MiddlewareContext, TagRequestParams } from "../types.ts"

 const jwtGuard = () => {
  return async (context: MiddlewareContext, next: () => Promise<unknown>) => {
    const params = helpers.getQuery(context, { mergeParams: true }) as TagRequestParams;
    const { repository } = params;

    const { authRepository } = context;
    if (!authRepository) {
      throw new httpErrors.BadRequest("JWT doesn't contain any repository");
    }

    //const hasAccess = authRepository.find(repoName => repoName === repository);
    const hasAccess = authRepository.indexOf(repository);
    if (hasAccess === -1) {
      throw new httpErrors.Unauthorized(`Your JWT hasn't granded permission for repository ${repository}`);
    }

    await next();
  };
};

export { jwtGuard };
