import TeamModel from '../models/team.model';

class TeamFormatter {
  private static teams: TeamModel[] = [];

  public static format(teams: any[]) {
    teams.forEach((team: any) => {
      TeamFormatter.teams.push(new TeamModel(team.id, team.name));
    });
  }

  public static getTeam(team: number): TeamModel | undefined {
    return TeamFormatter.teams.find((model) => model.getId() === team);
  }

}

export default TeamFormatter;
