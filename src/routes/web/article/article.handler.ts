import type { RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { createArticleRoute, deleteArticleRoute, getArticleRoute, listArticleRoute, updateArticleRoute } from "./article.route";
import type { AppBindings } from "..";

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;

export const getArticleHandler: AppRouteHandler<typeof getArticleRoute> = async (c) => {
  const { id } = c.req.valid('param')
  // UseCase層へ処理移譲
  // const article = await getArticle(id);

  // Mock
  const article = {
    id: id,
    title: 'title1',
    content: 'content1',
    page: 2
  }
  return c.json(article, 200);
}

export const listArticleHandler: AppRouteHandler<typeof listArticleRoute> = async (c) => {
  // UseCase層へ処理移譲
  // const articles = await listArticle();

  // Mock
  const articles = [
    {
      id: 1,
      title: 'title1',
      content: 'content1',
      page: 1
    },
    {
      id: 2,
      title: 'title2',
      content: 'content2',
      page: 2
    },
    {
      id: 3,
      title: 'title3',
      content: 'content3',
      page: 3
    }
  ]
  return c.json(articles, 200);
}

export const createArticleHandler: AppRouteHandler<typeof createArticleRoute> = async (c) => {
  const { title, content } = c.req.valid('json')

  // 例外テスト
  // throw new HTTPException(401, {message: 'テスト例外'})

  // UseCase層へ処理移譲
  // const article = await createArticle();
  // const id = article.id;
  const id = 7;

  // Mock
  const article = {
    id: id,
    title,
    content,
    page: 1
  }
  return c.json(article, 201);
}

export const updateArticleHandler: AppRouteHandler<typeof updateArticleRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const { title } = c.req.valid('json')

  // UseCase層へ処理移譲
  // const article = await updateArticle(id);
  const content = 'content1';
  const page = 3;

  // Mock
  const article = {
    id,
    title,
    content,
    page
  }
  return c.json(article, 200);
}

export const deleteArticleHandler: AppRouteHandler<typeof deleteArticleRoute> = async (c) => {
  const { id } = c.req.valid('param')
  // UseCase層へ処理移譲
  // await deleteArticle(id);

  return new Response(null, { status: 204 });
}