import AppModel from '../models/app.model';
import TeamFormatter from './team.formatter';
import { Moment } from 'moment';
import MatchFormatter from './match.formatter';
import * as moment from 'moment';

class DataFormatter {
    public static getDate(date: string): Moment {
        return moment(date);
    }

    public static format(data: any): AppModel {
        // need array of teams here for this to work
        TeamFormatter.format(data.teams);
        const matches = MatchFormatter.format(data.matches);
        return new AppModel(matches);
    }
}

export default DataFormatter;
