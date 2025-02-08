import type { z } from "zod"

// リクエストスキーマからの型推論でハンドラーはバリデーションの型を判断するためジェネリクスで指定
export const bodyRequest = <T extends z.ZodTypeAny>(schema: T) => {
  return {
    content: {
      "application/json": {
        schema,
      },
    } as const,
  };
};