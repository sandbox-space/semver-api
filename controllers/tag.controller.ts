import { helpers } from "../deps.ts";
import { MiddlewareContext, TagRequestParams } from "../types.ts"
import { createToken as authCreateToken } from "../services/auth.service.ts"
import { jwtGuard } from "../middlewares/jwt-guard.middleware.ts"
import { 
  getTags as repositoryGetTags, 
  tagDistinction as repositoryTagDistinction
} from "../services/repository.service.ts"

const list = [
  jwtGuard(),
  async (context: MiddlewareContext) => {
    const params = helpers.getQuery(context, { mergeParams: true }) as TagRequestParams;
    const { repository, filter } = params;

    console.log('List route');

    const registryToken = await authCreateToken([repository]);
    let tags = await repositoryGetTags(registryToken, repository, filter);
    tags['tags'] = tags['tags'].slice(-5);

    context.response.body = tags;
  }
];

const newest = [
  jwtGuard(),
  async (context: MiddlewareContext) => {
    const params = helpers.getQuery(context, { mergeParams: true }) as TagRequestParams;
    const { repository, filter } = params;

    console.log('Newest route');

    const registryToken = await authCreateToken([repository]);
    let tags = await repositoryGetTags(registryToken, repository, filter);
    tags['tags'] = tags['tags'].slice(-1);

    context.response.body = tags;
  }
];

const missing = [
  jwtGuard(),
  async (context: MiddlewareContext) => {
    const params = helpers.getQuery(context, { mergeParams: true }) as TagRequestParams;
    const { repository, filter, against } = params;

    console.log('Missing route');

    if (against === undefined) {
      context.response.status = 400;
      context.response.body = {
        error: "Missing required query param 'against'"
      };
      return;
    }

    const token = await authCreateToken([repository, against]);
    const tagsBase = await repositoryGetTags(token, repository, filter);
    const tagsAgains = await repositoryGetTags(token, against, filter);
    const distinction = repositoryTagDistinction(tagsBase, tagsAgains);
    context.response.body = distinction;
  }
];

export { list, newest, missing };