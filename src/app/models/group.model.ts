import StandingModel from './standings.model';
import MatchModel from './match.model';

class GroupModel {
    private name: string;
    private standings: StandingModel[];
    private matches: MatchModel[];

    public constructor(name: string, standings: StandingModel[], matches: MatchModel[]) {
        this.name = name;
        this.standings = standings;
        this.matches = matches;
    }

    public getName(): string {
        return this.name;
    }

    public setName(): string {
        return this.name;
    }

    public getDisplayName(): string {
        return this.getName().toUpperCase();
    }

    public getStandings(): StandingModel[] {
        return this.standings;
    }

    public setStandings(standings: StandingModel[]) {
        this.standings = standings;
    }

    public getMatches(): MatchModel[] {
        return this.matches;
    }
}

export default GroupModel;
