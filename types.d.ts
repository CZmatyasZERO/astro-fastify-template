// here belong custom types for whole project (main import file)
import type { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts"
import schemas from "./server/schemas"
import type fastify from "fastify"



declare module "fastify" {
    export interface FastifyInstance<
      HttpServer = http.Server,
      HttpRequest = http.IncomingMessage,
      HttpResponse = http.ServerResponse
    > {

      // custom decoration types here (your database object)
      db: {message: String}
    }
}



let app = fastify().withTypeProvider<JsonSchemaToTsProvider<{references: typeof schemas}>>()

type FastifyInstanceMod = typeof app
