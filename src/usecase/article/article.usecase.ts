import type { ArticleRepository } from "../../domain/article/article.repository";
import { Article } from "../../domain/article/article.entity";
import { UseCaseException } from "../error";

export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async getArticle(id: number): Promise<Article> {
    const article = await this.articleRepository.getArticleById(id);
    if (!article) {
      throw new UseCaseException("記事が見つかりません");
    }

    return article;
  }

  async listArticles(): Promise<Article[]> {
    return this.articleRepository.listArticles();
  }

  async createArticle(title: string, content: string): Promise<Article> {
    return this.articleRepository.createArticle(title, content);
  }

  async updateArticle(id: number, title: string): Promise<Article> {
    const article = await this.articleRepository.updateArticle(id, title);

    if (!article) {
      throw new UseCaseException("記事が見つかりません");
    }

    return article;
  }

  async deleteArticle(id: number): Promise<void> {
    return this.articleRepository.deleteArticle(id);
  }
}
