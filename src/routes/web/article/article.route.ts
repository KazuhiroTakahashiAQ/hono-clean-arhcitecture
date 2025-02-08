import { createRoute } from "@hono/zod-openapi";
import { z } from 'zod'
import { articleResponseSchema } from "../../../schema/web/aritcle/article.response";
import { articleCreateBodySchema, articleIdParamSchema, articleUpdateBodySchema } from "../../../schema/web/aritcle/article.request";
import { errorResponses } from "../../../schema/openapi/error.response";
import { createdResponse, noContentResponse, okResponse } from "../../../schema/openapi/success.response";
import { bodyRequest } from "../../../schema/openapi/body.request";

export const listArticleRoute = createRoute({
  tags: ['article'],
  method: 'get',
  path: '/',
  responses: {
    ...okResponse('記事一覧を取得する', z.array(articleResponseSchema)),
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
    ...okResponse('記事を取得する', articleResponseSchema),
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
    ...createdResponse('記事を作成する', articleResponseSchema),
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
    ...okResponse('記事を更新する', articleResponseSchema),
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
    ...noContentResponse('記事を削除する'),
    ...errorResponses
  },
});