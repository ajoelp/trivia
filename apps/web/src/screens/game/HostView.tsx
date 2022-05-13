import { GameProvider, useGameSocket } from "../../providers/GameProvider";
import { useParams } from "react-router-dom";
import { ChangeEvent } from "react";
import { Button } from "../../components/Button";

function HostGame() {
  const { question, instance, gameState } = useGameSocket();

  const handleGradingClick = (event: ChangeEvent<HTMLInputElement>, teamId: string) => {
    if (!question) {
      return;
    }
    instance.gradeQuestion({
      teamId,
      questionId: question.id,
      isCorrect: event.target.checked,
    });
  };

  const answers = gameState?.answers?.find((a) => a.questionId === question?.id);

  return (
    <div className="w-full max-w-md mx-auto my-auto">
      {question && (
        <>
          <h1 className="text-2xl font-extrabold">{question.value}</h1>
          <p className="text-lg text-secondary-500">{question.answer}</p>
          <div className="py-12 gap-12 flex flex-col">
            {gameState?.teams?.map((team) => {
              const answer = answers?.answers[team.id] ?? {};
              return (
                <div key={team.id}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-extrabold">{answer.answer ?? "Waiting"}</p>
                      <p className="text-xs">{team.name}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">Correct</span>
                      <input
                        id="candidates"
                        aria-describedby="candidates-description"
                        name="candidates"
                        type="checkbox"
                        className="focus:ring-secondary-500 h-4 w-4 text-secondary-600 border-gray-300 rounded"
                        onChange={(event) => handleGradingClick(event, team.id)}
                        defaultChecked={answer.isCorrect ?? false}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      <div className="flex gap-4 flex-wrap justify-center">
        <Button
          variant="secondary"
          onClick={() => {
            instance.startGame();
          }}
        >
          Start Game
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            instance.nextQuestion();
          }}
        >
          Next Question
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            instance.startEvaluating();
          }}
        >
          Start Grading
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            instance.showScores();
          }}
        >
          Show Question Scores
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            instance.finalReport();
          }}
        >
          Show Total Scores
        </Button>
      </div>
    </div>
  );
}

export default function HostView() {
  const { code } = useParams();

  return (
    <GameProvider code={code as string}>
      <HostGame />
    </GameProvider>
  );
}
