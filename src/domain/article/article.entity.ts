import { TitleIsEmptyError, TitleTooLongError, PageOutOfRangeError } from "../error";

export class Article {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public page: number
  ) {}

  public renameTitle(newTitle: string): void {
    if (!newTitle || newTitle.trim().length === 0) {
      throw new TitleIsEmptyError();
    }
    if (newTitle.length > 50) {
      throw new TitleTooLongError(newTitle.length);
    }
    this.title = newTitle;
  }

  public changePage(newPage: number): void {
    if (newPage < 1) {
      throw new PageOutOfRangeError(newPage);
    }
    this.page = newPage;
  }
}
