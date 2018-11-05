import { toTitleCase } from './../helpers';

class TeamModel {
    private id: number;
    private name: string;

    public constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

    // Hardcoded value since Japan and England had a complete tie
    public getWeight() {
        if (this.getName() === 'Japan') {
            return 1;
        }

        if (this.getName() === 'England') {
            return 1;
        }

        return 0;
    }
}

export default TeamModel;
