import { Box, Button, Checkbox, Container, HStack, Text, VStack } from "@chakra-ui/react";
import { GameProvider, useGameSocket } from "../../providers/GameProvider";
import { useParams } from "react-router-dom";

function HostGame() {
  const { question, instance, gameState } = useGameSocket();

  const handleNextQuestionClick = () => {
    instance.nextQuestion();
  };

  const handleGradingClick = (event, teamId) => {
    if (!question) {
      return;
    }

    instance.gradeQuestion({
      teamId,
      questionId: question.id,
      isCorrect: event.target.value,
    });
  };

  const answers = gameState?.answers?.find((a) => a.questionId === question?.id);

  return (
    <Box w={"container.md"} mx={"auto"}>
      {question && (
        <>
          <Text as={"h1"}>Question #1</Text>
          <p>{question.value}</p>
          <Box py="12" gap="12" display="flex" flexDirection="column">
            {Object.entries(answers?.answers ?? {}).map(([teamId, answer]) => (
              <HStack justifyContent="space-between">
                <div>
                  <p>{answer.answer}</p>
                  <Text fontSize="lg">
                    {gameState?.teams?.find((team) => team.id === teamId)?.name || "Default Team Name"}
                  </Text>
                </div>
                <Checkbox onChange={(event) => handleGradingClick(event, teamId)}>Correct</Checkbox>
              </HStack>
            ))}
          </Box>
        </>
      )}
      <Button onClick={handleNextQuestionClick}>Next Question</Button>
    </Box>
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
