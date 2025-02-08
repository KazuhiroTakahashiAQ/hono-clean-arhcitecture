import { TitleIsEmptyError, TitleTooLongError, PageOutOfRangeError } from "../error";

export class Article {
  private _id: number | undefined;
  private _title: string;
  private _content: string;
  private _page: number;

  private constructor(
    id: number | undefined,
    title: string,
    content: string,
    page: number
  ) {
    this._id = id;
    this._title = title;
    this._content = content;
    this._page = page;
  }

  get id(): number | undefined {
    return this._id;
  }
  get title(): string {
    return this._title;
  }
  get content(): string {
    return this._content;
  }
  get page(): number {
    return this._page;
  }

  public static construct(title: string, content: string, page: number): Article {
    return new Article(undefined, title, content, page);
  }

  public static reconstruct(id: number, title: string, content: string, page: number): Article {
    return new Article(id, title, content, page);
  }

  public renameTitle(newTitle: string): void {
    if (!newTitle || newTitle.trim().length === 0) {
      throw new TitleIsEmptyError();
    }
    if (newTitle.length > 50) {
      throw new TitleTooLongError(newTitle.length);
    }
    this._title = newTitle;
  }

  public changePage(newPage: number): void {
    if (newPage < 1) {
      throw new PageOutOfRangeError(newPage);
    }
    this._page = newPage;
  }
}
