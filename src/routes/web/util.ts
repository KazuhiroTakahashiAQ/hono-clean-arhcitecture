import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import type { ZodError } from "zod";
import type { AppBindings } from "./index";

// Zod Exception(パラメータバリデーション)
export const handleZodError = (
    result: {
            success: true;
            data: any;
        } | {
            success: false;
            error: ZodError;
        },
    c: Context,
) => {
  if (!result.success) {
    return c.json(
      {
        error: {
          code: "400",
          message: result.error.issues[0].message,
        },
      },
      { status: 400 },
    );
  }
}


// HTTP Exception
export const handleError = (err: Error, c: Context<AppBindings>): Response => {
    if (err instanceof HTTPException) {
        if (err.status >= 500) {
          // Loggerを仕込んでいればここでロギング
          console.error(`HTTPException: message: ${err.message}, status: ${err.status}`)
        }
        return c.json(
            {
              error: {
                code: err.status,
                message: err.message,
              },
            },
            err.status
        );
    }

    // Loggerを仕込んでいればここでロギング
    console.error(`unhandled exception: name: ${err.name}, message: ${err.message}, cause: ${err.cause}, stack: ${err.stack}`)
    return c.json(
        {
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: err.message ?? "something unexpected happened",
            },
        },
        { status: 500 },
    );
}
