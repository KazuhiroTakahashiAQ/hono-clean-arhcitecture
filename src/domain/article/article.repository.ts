import { Article } from "./article.entity";

export interface ArticleRepository {
  getArticleById(id: number): Promise<Article | undefined>;
  listArticles(): Promise<Article[]>;
  createArticle(article: Article): Promise<Article>;
  updateArticle(updatedArticle: Article): Promise<Article | undefined>;
  deleteArticle(id: number): Promise<void>;
}
