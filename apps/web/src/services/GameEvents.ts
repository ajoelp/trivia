import {
  AnswerQuestionAction,
  ANSWER_QUESTION,
  FinalReportAction,
  FINAL_REPORT,
  GradeQuestionAction,
  GRADE_QUESTION,
  NextQuestionAction,
  NEXT_QUESTION,
  ShowScoresAction,
  SHOW_SCORES,
  StartEvaluatingAction,
  StartGameAction,
  START_EVALUATING,
  START_GAME,
} from "@trivia/shared/events";

export class GameEvents {
  static startGame(): StartGameAction {
    return { type: START_GAME };
  }

  static nextQuestion(): NextQuestionAction {
    return { type: NEXT_QUESTION };
  }

  static answerQuestion(questionId: string, teamId: string, answer: string): AnswerQuestionAction {
    return {
      type: ANSWER_QUESTION,
      payload: {
        questionId,
        teamId,
        answer,
      },
    };
  }

  static startEvaluating(): StartEvaluatingAction {
    return { type: START_EVALUATING };
  }

  static gradeQuestion(questionId: string, teamId: string, isCorrect: boolean): GradeQuestionAction {
    return {
      type: GRADE_QUESTION,
      payload: { teamId, questionId, isCorrect },
    };
  }

  static showScores(): ShowScoresAction {
    return { type: SHOW_SCORES };
  }

  static finalReport(): FinalReportAction {
    return { type: FINAL_REPORT };
  }
}
