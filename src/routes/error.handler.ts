import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";
import type { AppBindings } from "./web/index";
import { InfraException } from "../infra/error";
import { UseCaseException } from "../usecase/error";
import { DomainException } from "../domain/error";

// Zod Exception(パラメータバリデーション)
export function handleZodError(
  result: { success: true } | { success: false; error: ZodError },
  c: Context,
) {
  if (result.success) return;
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

// その他例外
const internalServerErrorJson = {
  error: {
    code: "INTERNAL_SERVER_ERROR",
    message: "something unexpected happened",
  },
}

export const handleError = (err: Error, c: Context<AppBindings>): Response => {
  if (err instanceof InfraException) {
    // Loggerを仕込んでいればここでロギング
    console.error(`InfraException: message: ${err.message}, cause: ${err.cause}, stack: ${err.stack}`)
    return c.json(internalServerErrorJson, 500)
  } else if (err instanceof DomainException) {
    // Loggerを仕込んでいればここでロギング
    console.error(`DomainException: message: ${err.message}, cause: ${err.cause}, stack: ${err.stack}`)
    return c.json(internalServerErrorJson, 500)
  } else if (err instanceof UseCaseException) {
    // Loggerを仕込んでいればここでロギング
    console.error(`UseCaseException: message: ${err.message}, cause: ${err.cause}, stack: ${err.stack}`)
    return c.json(internalServerErrorJson, 500)
  } else if (err instanceof HTTPException) {
    // Loggerを仕込んでいればここでロギング
    console.error(`HTTPException: message: ${err.message}, status: ${err.status}, stack: ${err.stack}`)
    return c.json(internalServerErrorJson, 500);
  }

  // Loggerを仕込んでいればここでロギング
  console.error(`unhandled exception: name: ${err.name}, message: ${err.message}, cause: ${err.cause}, stack: ${err.stack}`)
  return c.json(internalServerErrorJson, 500);
}
