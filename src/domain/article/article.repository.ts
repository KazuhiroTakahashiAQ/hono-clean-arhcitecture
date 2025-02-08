import { Article } from "./article.entity";

export interface ArticleRepository {
  getArticleById(id: number): Promise<Article | null>;
  listArticles(): Promise<Article[]>;
  createArticle(title: string, content: string): Promise<Article>;
  updateArticle(id: number, title: string): Promise<Article | null>;
  deleteArticle(id: number): Promise<void>;
}
