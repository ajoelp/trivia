import { QuestionAnswers, Answer } from "@trivia/shared/types";

export class GameAnswers {
  answers: Map<string, QuestionAnswers["answers"]> = new Map();

  answerQuestion(questionId: string, teamId: string, answer: string) {
    this.updateQuestion(questionId, teamId, { answer });
  }

  gradeQuestion(questionId: string, teamId: string, isCorrect: boolean) {
    this.updateQuestion(questionId, teamId, { isCorrect });
  }

  updateQuestion(questionId: string, teamId: string, payload: Partial<Answer>) {
    const existing = this.answers.get(questionId) ?? {};

    existing[teamId] = {
      ...(existing[teamId] ?? {}),
      ...payload,
    };
    this.answers.set(questionId, existing);
  }

  answeredQuestionIds(): string[] {
    return [...this.answers.entries()].map(([id]) => id);
  }

  fromJson(questionAnswers: QuestionAnswers[]) {
    this.answers = new Map((questionAnswers ?? []).map((q) => [q.questionId, q.answers]));
  }

  toJson(): QuestionAnswers[] {
    return [...this.answers.entries()].map(([id, answers]) => ({
      questionId: id,
      answers,
    }));
  }
}
