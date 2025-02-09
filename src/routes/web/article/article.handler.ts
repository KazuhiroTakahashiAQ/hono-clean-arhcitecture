import type { createArticleRoute, deleteArticleRoute, getArticleRoute, listArticleRoute, updateArticleRoute } from "./article.route";
import type { AppRouteHandler } from "..";
import { ArticleService } from "../../../usecase/article/article.usecase";
import { MockArticleRepository } from "../../../infra/article/mock.article.repository";

const articleRepository = new MockArticleRepository();
const articleService = new ArticleService(articleRepository);

export const getArticleHandler: AppRouteHandler<typeof getArticleRoute> = async (c) => {
  const params = c.req.valid('param')
  const article = await articleService.getArticle(params);

  return c.json(article, 200);
}

export const listArticleHandler: AppRouteHandler<typeof listArticleRoute> = async (c) => {
  const articles = await articleService.listArticles();

  return c.json(articles, 200);
}

export const createArticleHandler: AppRouteHandler<typeof createArticleRoute> = async (c) => {
  const params = c.req.valid('json')
  const article = await articleService.createArticle(params);

  return c.json(article, 201);
}

export const updateArticleHandler: AppRouteHandler<typeof updateArticleRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const { title } = c.req.valid('json')
  const params = { id, title }
  const article = await articleService.updateArticle(params);

  return c.json(article, 200);
}

export const deleteArticleHandler: AppRouteHandler<typeof deleteArticleRoute> = async (c) => {
  const params = c.req.valid('param')
  await articleService.deleteArticle(params);

  return new Response(null, { status: 204 });
}