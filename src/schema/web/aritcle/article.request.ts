import { z } from "zod"

export const articleIdParamSchema = z.object({
  id: z.string().pipe(z.coerce.number().int())
})

export const articleCreateBodySchema = z.object({
  title: z.string().openapi({ description: '記事のタイトル' }),
  content: z.string().openapi({ description: "記事内容" }),
})

export const articleUpdateBodySchema = z.object({
  // 10文字以上の文字列
  title: z.string().min(10).openapi({ description: '記事のタイトル' }),
})