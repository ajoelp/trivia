import { Team, TeamMember } from "@trivia/shared/types";
import { v4 as uuid } from "uuid";

export class GameTeams {
  teams: Map<string, Team> = new Map();

  addTeam(teamName: string): Team {
    const team: Team = {
      id: uuid(),
      name: teamName,
      members: [],
    };

    this.teams.set(team.id, team);

    return team;
  }

  removeTeam(id: string) {
    this.teams.delete(id);
  }

  updateTeam(id: string, payload: Partial<Omit<Team, "id">>): Team {
    const team = this.teams.get(id);

    const updated: Team = {
      ...team,
      ...payload,
    };

    this.teams.set(team.id, updated);

    return updated;
  }

  addTeamMember(teamId: string, name: string): TeamMember {
    const team = this.teams.get(teamId);
    const newMember: TeamMember = { id: uuid(), name };
    const members = [...team.members, newMember];
    this.teams.set(team.id, { ...team, members });
    return newMember;
  }

  removeTeamMember(teamId: string, memberId: string) {
    const team = this.teams.get(teamId);

    if (!team) throw new Error("Team not found");

    const members = team.members.filter((member) => member.id !== memberId);
    this.teams.set(team.id, { ...team, members });
  }

  updateTeamMember(teamId: string, memberId: string, payload: Partial<Omit<TeamMember, "id">>) {
    const team = this.teams.get(teamId);

    if (!team) throw new Error("Team not found");

    const memberIndex = team.members.findIndex((member) => member.id === memberId);

    if (memberIndex < 0) throw new Error("Team member not found");

    team.members[memberIndex] = { ...team.members[memberIndex], ...payload };

    this.teams.set(team.id, team);

    return team.members[memberIndex];
  }

  fromJson(teams: Team[]) {
    this.teams = new Map((teams ?? []).reduce((carry, team) => [...carry, [team.id, team]], []));
  }

  toArray(): Team[] {
    return [...this.teams.values()];
  }
}
