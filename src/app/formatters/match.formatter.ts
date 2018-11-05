import GroupModel from '../models/group.model';
import MatchModel from '../models/match.model';
import StandingModel from '../models/standings.model';
import TeamFormatter from './team.formatter';
import ResultFormatter from './result.formatter';
import DataFormatter from './data.formatter';

class GroupFormatter {

  public static format(groupData: any): GroupModel[] {
    const models: GroupModel[] = [];
    const standingsData: StandingModel[] = [];

    Object.keys(groupData).forEach((key) => {
      const matches = GroupFormatter.createMatches(groupData[key], key);
      models.push(new GroupModel(key, GroupFormatter.createStandings(matches), matches));
    });

    return models;
  }

  public static updateStandings(group: GroupModel) {
    group.setStandings(this.createStandings(group.getMatches()));
  }

  private static createMatches(data: any, key: string): MatchModel[] {
    const matches: MatchModel[] = [];
    data.forEach((match) => {
      const hometeam = TeamFormatter.getTeam(match.homeTeam.id);
      const awayteam = TeamFormatter.getTeam(match.awayTeam.id);
      if (hometeam && awayteam) {
        const object = new MatchModel(
          match.id,
          hometeam,
          awayteam,
          ResultFormatter.getResult(match, 'home'),
          ResultFormatter.getResult(match, 'away'),
          DataFormatter.getDate(match.date),
          'groups',
          match.group);
        matches.push(object);
      }
    });

    return matches;
  }

  private static sortStandings(matches: MatchModel[], standings: StandingModel[]): StandingModel[] {
    standings.sort((a: StandingModel, b: StandingModel) => {
      if (a.getPoints() !== b.getPoints()) {
        return a.getPoints() < b.getPoints() ? 1 : -1;
      }

      if (a.getGoalsDifference() !== b.getGoalsDifference()) {
        return a.getGoalsDifference() < b.getGoalsDifference() ? 1 : -1;
      }

      if (a.getGoalsFor() !== b.getGoalsFor()) {
        return a.getGoalsFor < b.getGoalsFor ? -1 : 1;
      }

      let match = matches.find((m: MatchModel) => {
        const ateam = a.getTeam();
        const bteam = b.getTeam();
        const hometeam = m.getHomeTeam();
        const awayteam = m.getAwayTeam();
        if (typeof hometeam !== 'string' && typeof awayteam !== 'string' && typeof ateam !== 'string' && typeof bteam !== 'string') {
          return hometeam.getId() === ateam.getId() && awayteam.getId() === bteam.getId();
        }
      });
      if (match) {
        if (match.getHomeResult() > match.getAwayResult()) {
          return -1;
        }

        if (match.getAwayResult() > match.getHomeResult()) {
          return 1;
        }
      }
      match = matches.find((m: MatchModel) => {
        const ateam = a.getTeam();
        const bteam = b.getTeam();
        const hometeam = m.getHomeTeam();
        const awayteam = m.getAwayTeam();
        if (typeof hometeam !== 'string' && typeof awayteam !== 'string' && typeof ateam !== 'string' && typeof bteam !== 'string') {
          return hometeam.getId() === bteam.getId() && awayteam.getId() === ateam.getId();
        }
      });
      if (match) {
        if (match.getHomeResult() > match.getAwayResult()) {
          return 1;
        }

        if (match.getAwayResult() > match.getHomeResult()) {
          return -1;
        }
      }

      const aTeam = a.getTeam();
      const bTeam = b.getTeam();

      if (typeof aTeam !== 'string' && typeof bTeam !== 'string') {
        return aTeam.getWeight() < bTeam.getWeight() ? 1 : -1;
      }
    });
    return standings;
  }

  private static createStandings(matches: MatchModel[]): StandingModel[] {
    let standings: StandingModel[] = [];

    matches.forEach((m) => {
      standings = GroupFormatter.formatStandingMatch(standings, m, true);
      standings = GroupFormatter.formatStandingMatch(standings, m, false);
    });

    return this.sortStandings(matches, standings);
  }

  private static formatStandingMatch(standings: StandingModel[], match: MatchModel, isHometeam: boolean): StandingModel[] {
    const team = isHometeam ? match.getHomeTeam() : match.getAwayTeam();
    let index = standings.findIndex((value) => value.getTeam() === team);
    if (index === -1) {
      standings.push(new StandingModel(team));
      index = standings.findIndex((value) => value.getTeam() === team);
    }
    const standing = standings[index];

    if (match.getHomeResult() !== null && match.getAwayResult() !== null) {
      standing.addPlayed();
      if (isHometeam) {
        standing.addGoalsFor(match.getHomeResult());
        standing.addGoalsAgainst(match.getAwayResult());
        if (match.getHomeResult() === match.getAwayResult()) {
          standing.addDraw();
        } else if (match.getHomeResult() > match.getAwayResult()) {
          standing.addWin();
        } else {
          standing.addLost();
        }
      } else {
        standing.addGoalsFor(match.getAwayResult());
        standing.addGoalsAgainst(match.getHomeResult());
        if (match.getHomeResult() === match.getAwayResult()) {
          standing.addDraw();
        } else if (match.getHomeResult() < match.getAwayResult()) {
          standing.addWin();
        } else {
          standing.addLost();
        }
      }
      standings[index] = standing;
    }

    return standings;
  }
}

export default GroupFormatter;
