import { GameSocket } from "../../services/GameSocket";
import { useLocalStorage } from "usehooks-ts";
import { useCallback, useState } from "react";
import { Box, Button, Heading, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { GameState } from "@trivia/shared/types";
import { useGameSocket } from "../../providers/GameProvider";

export function JoinTeam() {
  const { gameState, instance } = useGameSocket();
  const [teamId, setTeamId] = useLocalStorage<string | null>("teamId", null);
  const [teamName, setTeamName] = useState("");

  const handleClick = useCallback(() => {
    if (teamName.length <= 0) return;
    instance.createTeam({ name: teamName });
    setTeamName("");
  }, [instance, teamName]);

  return (
    <Box width="100%" maxWidth="400px" mx="auto" display="flex" flexDirection="column" gap="4">
      <Heading>Join A Team</Heading>
      <Box display="flex" flexDirection="column" gap="2">
        {gameState?.teams.map((team) => (
          <Button
            variant="outline"
            colorScheme="white"
            size="lg"
            width="100%"
            key={team.id}
            onClick={() => {
              setTeamId(team.id);
            }}
          >
            {team.name}
          </Button>
        ))}
      </Box>
      <InputGroup size="md" color="black">
        <Input
          backgroundColor="white"
          pr="4.5rem"
          placeholder="Create A Team"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick} colorScheme="secondary">
            Create
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}
