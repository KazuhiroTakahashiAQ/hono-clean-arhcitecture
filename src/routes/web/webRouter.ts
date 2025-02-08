import { OpenAPIHono } from "@hono/zod-openapi";
import { articleRoute } from "./article/index";
import { handleZodError } from "./util";

export type AppBindings = {
  Variables: {
    // logger: PinoLogger;
  };
};
export const webRouter = new OpenAPIHono({defaultHook: handleZodError})
  .route('/article', articleRoute)
