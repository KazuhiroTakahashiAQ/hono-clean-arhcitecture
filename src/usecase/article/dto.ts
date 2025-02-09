import { z } from "zod";
import { articleUpdateBodySchema, articleIdParamSchema, articleCreateBodySchema } from "../../schema/web/aritcle/article.request";


type idParamSchema = z.infer<typeof articleIdParamSchema>
export type getParams = idParamSchema

export type createParams = z.infer<typeof articleCreateBodySchema>

type updateBodySchema = z.infer<typeof articleUpdateBodySchema>
export type updateParams = idParamSchema & updateBodySchema

export type deleteParams = idParamSchema;