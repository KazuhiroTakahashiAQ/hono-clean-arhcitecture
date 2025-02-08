export abstract class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DomainException";
  }
}

export class TitleIsEmptyError extends DomainException {
  constructor() {
    super("Title is empty.");
    this.name = "TitleIsEmptyError";
  }
}

export class TitleTooLongError extends DomainException {
  constructor(length: number) {
    super(`Title is too long. Length=${length}, max=50`);
    this.name = "TitleTooLongError";
  }
}

export class PageOutOfRangeError extends DomainException {
  constructor(value: number) {
    super(`Page number must be >= 1. (received: ${value})`);
    this.name = "PageOutOfRangeError";
  }
}
