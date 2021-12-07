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

const JWT_SECRET = Deno.env.get('JWT_SECRET') as string;
const encoder = new TextEncoder()
const secretBuffer = encoder.encode(JWT_SECRET);
const key = await crypto.subtle.importKey(
  "raw",
  secretBuffer,
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

const token = await create(JwtHeader, payload, key)

try {
  const payloadDecoded = await verify(token, key);
  console.log("Payload:");
  console.log(payloadDecoded);
  console.log("Token:");
  console.log(`---> ${token} <---`);
  console.log(key);
} catch (error) {
  console.error(error.toString());
  Deno.exit(1);
}