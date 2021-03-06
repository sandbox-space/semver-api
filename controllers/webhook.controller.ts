import { required, isString, validateObject } from "../deps.ts";
import { sendSlackMessage } from "../deps.ts";
import { MiddlewareContext, DockerHubWebhook } from "../types.ts"
import { requestValidator } from "../middlewares/request-validator.middleware.ts";

/** 
 * request body schema 
 * for user create/update 
 * */
const validatorProxySchema = {
  push_data: validateObject(true, {
    tag: [required, isString],
  }),
  repository: validateObject(true, {
    repo_name: [required, isString],
  }),
  callback_url: [required, isString],
};

const proxy = [
  requestValidator({ bodyRules: validatorProxySchema }),
  async (context: MiddlewareContext) => {
    const requestBody = await context.request.body().value as DockerHubWebhook;
    console.log(requestBody);

    const SLACK_WEBHOOK_URL = Deno.env.get('SLACK_WEBHOOK_URL') as string;
    console.log(SLACK_WEBHOOK_URL);
    //console.log(Deno.env.toObject());

    const slackMessage = `Builded new image tag *${requestBody.repository.repo_name}:${requestBody.push_data.tag}*`;
    sendSlackMessage(SLACK_WEBHOOK_URL, slackMessage);

    // const slackDebug = `\`\`\`${JSON.stringify(requestBody, null, 2)}\`\`\``;
    // sendSlackMessage(SLACK_WEBHOOK_URL, slackDebug);

    context.response.body = "ok";
  }
];

export { proxy };