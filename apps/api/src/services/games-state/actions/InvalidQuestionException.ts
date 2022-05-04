export class InvalidQuestionException extends Error {
  constructor() {
    super("Invalid question action");
  }
}
