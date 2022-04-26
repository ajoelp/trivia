export class QuestionNotFoundException extends Error {
  constructor() {
    super("Question could not be found");
  }
}
