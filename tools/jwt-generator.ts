import { dirname, fromFileUrl } from "../deps.ts";
import { create, verify } from "../deps.ts"
import { config } from "../deps.ts";
import { fsExistsSync } from "../deps.ts";
import { JwtHeader } from "../config/jwt.config.ts" 

const scriptDir = fromFileUrl(dirname(import.meta.url));
const envFile = `${scriptDir}/../.env`;

if (fsExistsSync(envFile)) {
  config({ 
    path: envFile,
    export: true,
  });
}

const JWT_SECRET = Deno.env.get('JWT_SECRET') as string;

const payload = {
  repository: [
    "sandboxspace/php-prod",
    "sandboxspace/php-dev",
    "sandboxspace/nginx-prod",
    "sandboxspace/nginx-dev",
    "sandboxspace/mariadb-prod",
    "sandboxspace/mariadb-dev",
    "library/php",
    "library/mariadb",
    "library/nginx",
    "library/alpine",
  ]
};

const token = await create(JwtHeader, payload, JWT_SECRET)

try {
  const payloadDecoded = await verify(token, JWT_SECRET, JwtHeader.alg);
  console.log("Payload:");
  console.log(payloadDecoded);
  console.log("Token:");
  console.log(`---> ${token} <---`);
} catch (error) {
  console.error(error.toString());
  Deno.exit(1);
}