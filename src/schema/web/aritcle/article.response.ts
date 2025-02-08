import { z } from "zod"

export type articleResponseType = z.infer<typeof articleResponseSchema>
export const articleResponseSchema = z.object({
  // クエリパラメータでは文字列しか受け取れないため、numberに変換する
  id: z.string().pipe(z.coerce.number().int()).openapi({type: 'integer'}),
  title: z.string().openapi({ type: 'string' }),
  content: z.string().openapi({ type: 'string' }),
  page: z.string().pipe(z.coerce.number().int()).openapi({type: 'integer'}),
})
