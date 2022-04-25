function makeAction<T extends string>(actionName: T) {
    return `${actionName}-action` as const
}

export const START_GAME = makeAction('start-game')
export const NEXT_QUESTION = makeAction('next-question')
export const ANSWER_QUESTION = makeAction('answer-question')
export const START_EVALUATING = makeAction('start-evaluating')
export const GRADE_QUESTION = makeAction('grade-question')
export const SHOW_SCORES = makeAction('show-scores')


export type StartGameAction = {
    type: typeof START_GAME,
}

export type NextQuestionAction = {
    type: typeof NEXT_QUESTION,
}

export type AnswerQuestionAction = {
    type: typeof ANSWER_QUESTION,
    payload: {
        teamId: string,
        answer: string
    }
}

export type StartEvaluatingAction = {
    type: typeof START_EVALUATING,
}

export type GradeQuestionAction = {
    type: typeof GRADE_QUESTION,
    payload: { teamId: string, isCorrect: boolean },
}

export type ShowScoresAction = {
    type: typeof SHOW_SCORES,
}

export type TriviaActions =  StartGameAction | NextQuestionAction | AnswerQuestionAction | StartEvaluatingAction | GradeQuestionAction | ShowScoresAction


