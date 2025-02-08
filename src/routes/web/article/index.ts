import { OpenAPIHono } from "@hono/zod-openapi";
import * as routes from "./article.route"
import * as handlers from "./article.handler"
import { handleError, handleZodError } from "../util";
import type { AppBindings } from "../webRouter";

function createRouter(){
  return new OpenAPIHono<AppBindings>({
    strict: true,
    defaultHook: handleZodError
  })
}

export const articleRoute = createRouter()
  .openapi(routes.listArticleRoute, handlers.listArticleHandler)
  .openapi(routes.getArticleRoute, handlers.getArticleHandler)
  .openapi(routes.createArticleRoute, handlers.createArticleHandler)
  .openapi(routes.updateArticleRoute, handlers.updateArticleHandler)
  .openapi(routes.deleteArticleRoute, handlers.deleteArticleHandler)
  .onError(handleError)
