function makeAction<T extends string>(actionName: T) {
    return `${actionName}-action` as const
}

export const START_GAME = makeAction('start-game')
export const NEXT_QUESTION = makeAction('next-question')
export const ANSWER_QUESTION = makeAction('answer-question')
export const START_EVALUATING = makeAction('start-evaluating')
export const GRADE_QUESTION = makeAction('grade-question')
export const SHOW_SCORES = makeAction('show-scores')
export const FINAL_REPORT = makeAction('final-report')
export const CREATE_TEAM = makeAction('create-team')
export const REMOVE_TEAM = makeAction('remove-team')

export type StartGameAction = {
    type: typeof START_GAME,
}

export type NextQuestionAction = {
    type: typeof NEXT_QUESTION,
}

export type AnswerQuestionAction = {
    type: typeof ANSWER_QUESTION,
    payload: {
        questionId: string,
        teamId: string,
        answer: string
    }
}

export type StartEvaluatingAction = {
    type: typeof START_EVALUATING,
}

export type GradeQuestionAction = {
    type: typeof GRADE_QUESTION,
    payload: { teamId: string, questionId: string, isCorrect: boolean },
}

export type ShowScoresAction = {
    type: typeof SHOW_SCORES,
}

export type FinalReportAction = {
    type: typeof FINAL_REPORT,
}

export type CreateTeamAction = {
    type: typeof CREATE_TEAM,
    payload: { name: string }
}

export type RemoveTeamAction = {
    type: typeof REMOVE_TEAM,
    payload: { id: string }
}

export type TriviaActions =  StartGameAction | NextQuestionAction | AnswerQuestionAction | StartEvaluatingAction | GradeQuestionAction | ShowScoresAction | FinalReportAction | CreateTeamAction | RemoveTeamAction


