import TeamModel from './team.model';
import * as moment from 'moment';
import { Moment } from 'moment';

class MatchModel {
  private id: number;
  private homeTeam: TeamModel | string;
  private awayTeam: TeamModel | string;
  private homeResult: number | null;
  private awayResult: number | null;
  private utcDate: Moment;
  private type: string;
  private groupname: string;

  public constructor(id: number, homeTeam: TeamModel | string, awayTeam: TeamModel | string, homeResult: number | null, awayResult: number | null, utcDate: Moment, type: string, groupname: string | null = null) {
    this.id = id;
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.homeResult = homeResult;
    this.awayResult = awayResult;
    this.utcDate = utcDate;
    this.type = type;
    this.groupname = groupname;
  }

  public getId(): number {
    return this.id;
  }

  public getHomeTeam(): TeamModel | string {
    return this.homeTeam;
  }

  public getAwayTeam(): TeamModel | string {
    return this.awayTeam;
  }

  public getHomeResult(): number | null {
    return this.homeResult;
  }

  public setHomeResult(result: number) {
    this.homeResult = result;
  }

  public getAwayResult(): number | null {
    return this.awayResult;
  }

  public setAwayResult(result: number) {
    this.awayResult = result;
  }

  public getUtcDate(): Moment {
    return this.utcDate;
  }

  public getType(): string {
    return this.type;
  }

  // To be used in the view
  public getGroupname(): string | null {
    return this.groupname;
  }

  public setGroupNem(groupName: string) {
    this.groupname = groupName;
  }

}

export default MatchModel;
