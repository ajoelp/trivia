import { DialogProps } from "dialog-manager-react";
import { render, screen, waitFor } from "@testing-library/react";
import ModifyQuestionDialog, { ModifyQuestionDialogProps } from "./ModifyQuestionDialog";
import userEvent from "@testing-library/user-event";
import { AppWrapper, mockServices } from "../testing/helpers";
import { QuestionFactory } from "../testing/factories/QuestionFactory";
import { Question } from "@trivia/shared/types";

const gameId = "game-id-string";

describe("ModifyQuestionDialog", () => {
  const closeDialog = jest.fn();
  const renderComponent = (props: Omit<ModifyQuestionDialogProps, keyof DialogProps | "gameId"> = {}) => {
    render(<ModifyQuestionDialog {...props} closeDialog={closeDialog} active={true} gameId={gameId} />, {
      wrapper: AppWrapper,
    });
  };

  it("will render the dialog", () => {
    renderComponent();
  });

  it("will fill out the form for a create", async () => {
    mockServices.questions.create.mockResolvedValue(QuestionFactory.build());
    mockServices.questions.list.mockResolvedValue(QuestionFactory.buildMany(5));

    renderComponent();

    const form = {
      Question: "This is the question",
      Answer: "This is the answer",
      Difficulty: "easy",
    };

    for (const [field, value] of Object.entries(form)) {
      await userEvent.type(await screen.findByLabelText(field), value);
      expect(await screen.findByLabelText(field)).toHaveValue(value);
    }

    userEvent.click(await screen.findByText("Save"));

    await waitFor(() =>
      expect(mockServices.questions.create).toHaveBeenCalledWith(
        gameId,
        expect.objectContaining({
          value: form.Question,
          answer: form.Answer,
          difficulty: form.Difficulty,
        }),
      ),
    );

    expect(closeDialog).toHaveBeenCalled();
  });

  it("will fill out the form for a update", async () => {
    const questionId = "question-id-string";
    renderComponent({ questionId });

    const form = {
      Question: "This is the question",
      Answer: "This is the answer",
      Difficulty: "easy",
    };

    for (const pair of Object.entries(form)) {
      await userEvent.type(await screen.findByLabelText(pair[0]), pair[1]);
    }

    await userEvent.click(await screen.findByText("Save"));

    await waitFor(() =>
      expect(mockServices.questions.update).toHaveBeenCalledWith(
        gameId,
        questionId,
        expect.objectContaining({
          value: form.Question,
          answer: form.Answer,
          difficulty: form.Difficulty,
        }),
      ),
    );
  });

  it("will preload a question", async () => {
    const question = QuestionFactory.build();
    mockServices.questions.fetch.mockResolvedValue(question);

    renderComponent({ questionId: question.id });
    expect(mockServices.questions.fetch).toHaveBeenCalledWith(gameId, question.id);

    expect(await screen.findByLabelText("Question")).toHaveValue(question.value);
    expect(await screen.findByLabelText("Answer")).toHaveValue(question.answer);
    expect(await screen.findByLabelText("Difficulty")).toHaveValue(question.difficulty);
  });
});
