import type { ArticleRepository } from "../../domain/article/article.repository";
import { Article } from "../../domain/article/article.entity";

export class MockArticleRepository implements ArticleRepository {
  // 今回はメモリ上で保持するための仮のデータを定義
  private articles = [
    { id: 1, title: "title1", content: "content1", page: 1 },
    { id: 2, title: "title2", content: "content2", page: 2 },
    { id: 3, title: "title3", content: "content3", page: 3 },
  ];

  private save(article: Article): Article {
    if (article.id === undefined) {
      // 新規作成
      // オートインクリメントを擬似的に再現
      const autoIncrementId = this.articles.reduce((max, a) => Math.max(max, a.id ?? 0), 0) + 1;
      this.articles.push({ id: autoIncrementId, title: article.title, content: article.content, page: article.page });

      return Article.reconstruct(autoIncrementId, article.title, article.content, article.page);
    } else {
      // 更新
      const index = this.articles.findIndex((a) => a.id === article.id);
      this.articles[index] = { id: article.id, title: article.title, content: article.content, page: article.page };

      return Article.reconstruct(article.id, article.title, article.content, article.page);
    }
  }

  async getArticleById(id: number): Promise<Article | undefined> {
    const article = this.articles.find((a) => a.id === id);

    if (!article) {
      return undefined;
    }

    return Article.reconstruct(
      article.id,
      article?.title,
      article?.content,
      article?.page
    ) ?? undefined;
  }

  async listArticles(): Promise<Article[]> {
    return this.articles.map((a) => Article.reconstruct(a.id, a.title, a.content, a.page));
  }

  async createArticle(article: Article): Promise<Article> {
    const createdArticle = this.save(article);

    return createdArticle;
  }

  async updateArticle(updateArticle: Article): Promise<Article | undefined> {
    this.save(updateArticle);

    return updateArticle;
  }

  async deleteArticle(id: number): Promise<void> {
    this.articles = this.articles.filter((a) => a.id !== id);
  }
}
