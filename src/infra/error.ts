export class InfraException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InfraException";
  }
}