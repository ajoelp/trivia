import { GameTeams } from "./GameTeams";

describe("GameTeams", () => {
  it("will add a new team", () => {
    const instance = new GameTeams();
    const teamName = "team-name";
    instance.addTeam(teamName);

    expect(instance.toArray()).toEqual(expect.arrayContaining([expect.objectContaining({ name: teamName })]));
  });

  it("it will remove a team", () => {
    const instance = new GameTeams();

    const teamName = "team-name";

    const team = instance.addTeam(teamName);
    instance.removeTeam(team.id);

    expect(instance.toArray()).toHaveLength(0);
  });

  it("will only remove a specific team", () => {
    const instance = new GameTeams();

    const teamName = "team-name";
    const secondTeam = "team-name-2";

    const team = instance.addTeam(teamName);
    instance.addTeam(secondTeam);
    instance.removeTeam(team.id);

    expect(instance.toArray()).toHaveLength(1);
    expect(instance.toArray()).toEqual(expect.arrayContaining([expect.objectContaining({ name: secondTeam })]));
  });

  it("will update a team name", () => {
    const instance = new GameTeams();

    const team = instance.addTeam("new-team-123");
    const updatedName = "updated-team-name";
    instance.updateTeam(team.id, { name: updatedName });
    expect(instance.toArray()).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: team.id, name: updatedName })]),
    );
  });

  it("will add a team member", () => {
    const instance = new GameTeams();
    const team = instance.addTeam("new-team");
    const memberName = "new team member";
    instance.addTeamMember(team.id, memberName);
    expect(instance.toArray()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: team.id,
          members: expect.arrayContaining([expect.objectContaining({ name: memberName })]),
        }),
      ]),
    );
  });

  it("will update a team member", () => {
    const instance = new GameTeams();

    const team = instance.addTeam("new-team");
    const memberName = "new team member";
    const member = instance.addTeamMember(team.id, memberName);
    const updatedName = "updated team name";
    instance.updateTeamMember(team.id, member.id, { name: updatedName });

    expect(instance.toArray()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: team.id,
          members: expect.arrayContaining([expect.objectContaining({ name: updatedName })]),
        }),
      ]),
    );
  });

  it("will remove a team member", () => {
    const instance = new GameTeams();
    const team = instance.addTeam("new-team");
    const member = instance.addTeamMember(team.id, "name");
    instance.removeTeamMember(team.id, member.id);

    expect(instance.toArray()[0].members).toHaveLength(0);
  });
});
