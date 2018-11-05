import TeamModel from './team.model';

export class StandingModel {
  private team: TeamModel | string;
  private played: number;
  private wins: number;
  private draws: number;
  private losses: number;
  private goalsFor: number;
  private goalsAgainst: number;
  private points: number;

  public constructor(
    team: TeamModel | string, played: number = 0,
    wins: number = 0, draws: number = 0, losses: number = 0,
    goalsFor: number = 0, goalsAgainst: number = 0, points: number = 0
  ) {
    this.team = team;
    this.played = played;
    this.wins = wins;
    this.draws = draws;
    this.losses = losses;
    this.goalsFor = goalsFor;
    this.goalsAgainst = goalsAgainst;
    this.points = points;
  }

  public getTeam(): TeamModel | string {
    return this.team;
  }

  public getPlayed(): number {
    return this.played;
  }

  public getWins(): number {
    return this.wins;
  }

  public getDraws(): number {
    return this.draws;
  }

  public getLosts(): number {
    return this.losses;
  }

  public getGoalsFor(): number {
    return this.goalsFor;
  }

  public getGoalsAgainst(): number {
    return this.goalsAgainst;
  }

  public getGoalsDifference(): number {
    return this.getGoalsFor() - this.getGoalsAgainst();
  }

  public getPoints(): number {
    this.points = (this.getWins() * 3) + this.getDraws();

    return this.points;
  }

  public addPlayed(): void {
    this.played += 1;
  }

  public addWin(): void {
    this.wins += 1;
  }

  public addDraw(): void {
    this.draws += 1;
  }

  public addLost(): void {
    this.losses += 1;
  }

  public addGoalsFor(goals: number | null): void {
    if (goals) {
      goals = +this.goalsFor + +goals;
      this.goalsFor = goals;
    }
  }

  public addGoalsAgainst(goals: number | null) {
    if (goals) {
      goals = +this.goalsAgainst + +goals;
      this.goalsAgainst = goals;
    }
  }

}

export default StandingModel;
