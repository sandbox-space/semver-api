import { Router } from "./deps.ts";
import * as hp from  "./controllers/hp.controller.ts";
import * as tag from  "./controllers/tag.controller.ts";
import * as webhook from  "./controllers/webhook.controller.ts";

const router = new Router();

router
  .get("/", hp.hp[0])

  .get("/tag/:repository([a-zA-Z0-9_-]+\\/[a-zA-Z0-9_-]+)/list", tag.list[0], tag.list[1])
  .get("/tag/:repository([a-zA-Z0-9_-]+\\/[a-zA-Z0-9_-]+)/newest", tag.newest[0], tag.newest[1])
  .get("/tag/:repository([a-zA-Z0-9_-]+\\/[a-zA-Z0-9_-]+)/missing", tag.missing[0], tag.missing[1])
  
  .post("/webhook/", webhook.proxy[0], webhook.proxy[1]);

export { router };