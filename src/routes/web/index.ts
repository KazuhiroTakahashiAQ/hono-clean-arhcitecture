import { OpenAPIHono, type RouteConfig, type RouteHandler } from "@hono/zod-openapi";
import { articleRoute } from "./article/index";
import { handleZodError } from "../error.handler";

export type AppBindings = {
  Variables: {
    // logger: PinoLogger;
  };
};

// ハンドラーがバリデーションの型推論を行うため、ジェネリクスでRouteを明示する
export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;

export const webRouter = new OpenAPIHono({defaultHook: handleZodError})
  .route('/article', articleRoute)
