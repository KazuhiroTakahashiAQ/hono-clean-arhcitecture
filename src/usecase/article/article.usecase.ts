import type { ArticleRepository } from "../../domain/article/article.repository";
import { Article } from "../../domain/article/article.entity";
import { UseCaseException } from "../error";
import type { createParams, deleteParams, getParams, updateParams } from "./dto";

export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async getArticle(params: getParams): Promise<Article> {
    const article = await this.articleRepository.getArticleById(params.id);
    if (!article) {
      throw new UseCaseException("記事が見つかりません");
    }

    return article;
  }

  async listArticles(): Promise<Article[]> {
    return this.articleRepository.listArticles();
  }

  async createArticle(params: createParams): Promise<Article> {
    const article = Article.construct(params.title, params.content, 1);
    return this.articleRepository.createArticle(article);
  }

  async updateArticle(params: updateParams): Promise<Article> {
    const article = await this.articleRepository.getArticleById(params.id);
    if (!article) {
      throw new UseCaseException("記事が見つかりません");
    }

    article.renameTitle(params.title);

    const updatedArticle = await this.articleRepository.updateArticle(article);
    if (!updatedArticle) {
      throw new UseCaseException("記事の更新に失敗しました");
    }
    return updatedArticle;
  }

  async deleteArticle(params: deleteParams): Promise<void> {
    return this.articleRepository.deleteArticle(params.id);
  }
}
