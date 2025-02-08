import { OpenAPIHono, type RouteConfig, type RouteHandler } from "@hono/zod-openapi";
import { articleRoute } from "./article/index";
import { handleError, handleZodError } from "../error.handler";

export type AppBindings = {
  Variables: {
    // logger: PinoLogger;
  };
};

export function createRouter(){
  return new OpenAPIHono<AppBindings>({
    strict: true,
    defaultHook: handleZodError
  });
}

// ハンドラーがバリデーションの型推論を行うため、ジェネリクスでRouteを明示する
export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;

export const webRouter = new OpenAPIHono({defaultHook: handleZodError})
  .route('/article', articleRoute)
