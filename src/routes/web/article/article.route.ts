import { createRoute } from "@hono/zod-openapi";
import { z } from 'zod'
import { articleResponseSchema } from "../../../schema/web/aritcle/article.response";
import { articleCreateBodySchema, articleIdParamSchema, articleUpdateBodySchema } from "../../../schema/web/aritcle/article.request";
import { errorResponses } from "../../../schema/common/error.response";
import { createdResponse, noContentResponse, okResponse } from "../../../schema/common/success.response";
import { bodyRequest } from "../../common/common.request";

export const listArticleRoute = createRoute({
  tags: ['article'],
  method: 'get',
  path: '/',
  responses: {
    200: okResponse('記事一覧を取得する', z.array(articleResponseSchema)),
    ...errorResponses
  },
  });

export const getArticleRoute = createRoute({
  tags: ['article'],
  method: 'get',
  path: '/{id}',
  request: {
    params: articleIdParamSchema
  },
  responses: {
    200: okResponse('記事を取得する', articleResponseSchema),
    ...errorResponses
  },
});

export const createArticleRoute = createRoute({
  tags: ['article'],
  method: 'post',
  path: '/',
  request: {
    body: bodyRequest(articleCreateBodySchema)
  },
  responses: {
    201: createdResponse('記事を作成する', articleResponseSchema),
    ...errorResponses
  }
});

export const updateArticleRoute = createRoute({
  tags: ['article'],
  method: 'put',
  path: '/{id}',
  request: {
    params: articleIdParamSchema,
    body: bodyRequest(articleUpdateBodySchema)
  },
  responses: {
    200: okResponse('記事を更新する', articleResponseSchema),
    ...errorResponses
  }
})

export const deleteArticleRoute = createRoute({
  tags: ['article'],
  method: 'delete',
  path: '/{id}',
  request: {
    params: articleIdParamSchema
  },
  responses: {
    204: noContentResponse('記事を削除する'),
    ...errorResponses
  },
});