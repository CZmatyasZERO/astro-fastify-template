import Fastify, { type FastifyReply, type FastifyRequest } from 'fastify';
import fastifyMiddie from '@fastify/middie';
import fastifyStatic from '@fastify/static';
import helmet from "@fastify/helmet"
import ajvFormats from "ajv-formats"
import autoLoad from '@fastify/autoload'
import { JSONDB } from "json-syncdb"
import { fileURLToPath } from 'node:url';
import { handler as ssrHandler } from '../dist/server/entry.mjs'
import type { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import schemas from "./schemas.ts"


const app = Fastify({ logger: true, ajv: { plugins: [ajvFormats] } }).withTypeProvider<JsonSchemaToTsProvider<{ references: typeof schemas }>>();
const db = { message: "This is message from database!" } // example object, there should be your database object


schemas.forEach(schema => {
  app.addSchema(schema)
})


//@ts-ignore
// sharing database across whole fastify
app.decorate("db", db)

await app.register(
  import('@fastify/compress'),
  { global: false }
)

await app.register(helmet, {
  contentSecurityPolicy: true,
  xFrameOptions: true,
  xssFilter: true
})

await app.register(fastifyMiddie);


// Astro SSR sites
app.use((req, res, next) => {
  ssrHandler(req, res, next, app.db) // pushing database into Astro.locals
})

// Register static files (with static generated Astro html files)
await app.register(fastifyStatic, {
  root: fileURLToPath(new URL('./../dist/client', import.meta.url)),
  list: false,
})


// importing API routes
await app.register(autoLoad, {
  dir: "./server/api",
  options: {
    prefix: "/api"
  }
})


app.setNotFoundHandler((req, res) => {
  if(req.method == "GET" && !req.originalUrl.startsWith("/api")) {
    return res.code(404).type("text/html").sendFile("404.html")
  } else {
    res.code(404)
    return new Error("Route " + req.method + ":" + req.originalUrl + " not found")
  }
}) 


app.listen({ port: Number(process.env.PORT) || 3000});
