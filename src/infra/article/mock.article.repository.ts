import type { ArticleRepository } from "../../domain/article/article.repository";
import { Article } from "../../domain/article/article.entity";

export class MockArticleRepository implements ArticleRepository {
  // 今回はメモリ上で保持するための仮のデータを定義
  private articles: Article[] = [
    new Article(1, "title1", "content1", 1),
    new Article(2, "title2", "content2", 2),
    new Article(3, "title3", "content3", 3),
  ];

  async getArticleById(id: number): Promise<Article | null> {
    const article = this.articles.find((a) => a.id === id);
    return article ?? null;
  }

  async listArticles(): Promise<Article[]> {
    return this.articles;
  }

  async createArticle(title: string, content: string): Promise<Article> {
    const newId = this.articles.length + 1; // 簡易的なID採番
    const newArticle = new Article(newId, title, content, 1); // page=1など適当に設定
    this.articles.push(newArticle);
    return newArticle;
  }

  async updateArticle(id: number, title: string): Promise<Article | null> {
    const index = this.articles.findIndex((a) => a.id === id);
    if (index === -1) {
      return null;
    }
    // 更新(必要に応じてcontentやpageも変更ロジック追加)
    const existing = this.articles[index];
    existing.title = title;
    // existing.content = ...
    // existing.page = ...
    this.articles[index] = existing;
    return existing;
  }

  async deleteArticle(id: number): Promise<void> {
    this.articles = this.articles.filter((a) => a.id !== id);
  }
}
