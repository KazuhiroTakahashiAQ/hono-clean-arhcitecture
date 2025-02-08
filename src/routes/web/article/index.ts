import * as routes from "./article.route"
import * as handlers from "./article.handler"
import { createRouter } from ".."
import { handleError } from "../../error.handler"

export const articleRoute = createRouter()
  .openapi(routes.listArticleRoute, handlers.listArticleHandler)
  .openapi(routes.getArticleRoute, handlers.getArticleHandler)
  .openapi(routes.createArticleRoute, handlers.createArticleHandler)
  .openapi(routes.updateArticleRoute, handlers.updateArticleHandler)
  .openapi(routes.deleteArticleRoute, handlers.deleteArticleHandler)
  .onError(handleError)
