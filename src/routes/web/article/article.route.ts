import { createRoute } from "@hono/zod-openapi";
import { z } from 'zod'
import { articleResponseSchema } from "../../../schema/web/aritcle/article.response";
import { articleCreateBodySchema, articleIdParamSchema, articleUpdateBodySchema } from "../../../schema/web/aritcle/article.request";
import { errorResponses } from "../../../schema/error";

export const listArticleRoute = createRoute({
  tags: ['article'],
  method: 'get',
  path: '/',
  responses: {
    200: {
      description: '記事一覧を取得する',
      content: {
        'application/json': {
          schema: z.array(articleResponseSchema)
        },
      },
    },
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
      200: {
        description: '記事を取得する',
        content: {
          'application/json': {
            schema: articleResponseSchema
          },
        },
      },
      ...errorResponses
    },
  });

  export const createArticleRoute = createRoute({
    tags: ['article'],
    method: 'post',
    path: '/',
    request: {
      body: {
        content: {
          "application/json": { schema: articleCreateBodySchema }
      }
    }},
    responses: {
      201: {
        description: '記事を作成する',
        content: {
          'application/json': {
            schema: articleResponseSchema
          },
        },
      },
      ...errorResponses
    }
  });

  export const updateArticleRoute = createRoute({
    tags: ['article'],
    method: 'put',
    path: '/{id}',
    request: {
      params: articleIdParamSchema,
      body: {
        content: {
          "application/json": { schema: articleUpdateBodySchema }
      }}
    },
    responses: {
      201: {
        description: '記事を作成する',
        content: {
          'application/json': {
            schema: articleResponseSchema
          },
        },
      },
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
      200: { description: '記事を削除する' }
    },
  });