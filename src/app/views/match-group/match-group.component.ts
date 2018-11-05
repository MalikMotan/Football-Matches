// Native/installed libraries
import { Component, OnInit, ViewChild } from '@angular/core';

// Custom services
import { MatchService } from '../../services/match.service';
import { Log } from 'ng2-logger/client';

// Custom formatters 
import MatchFormatter from './../../formatters/match.formatter';
import TeamFormatter from './../../formatters/team.formatter';

// Custom models
import GroupModel from './../../models/group.model';

// Constants
import { SHOR_COUNTRY_NAME } from './../../constants';

const log = Log.create('match-group.component.ts');

@Component({
  selector: 'app-match-group',
  templateUrl: './match-group.component.html',
  styleUrls: ['./match-group.component.scss'],
  providers: [MatchService]
})

export class MatchGroupComponent implements OnInit {
  matchList = [];
  formattedGroups = [];
  reconciledMatches = [];
  groupHash = [];
  groupParsed: GroupModel;
  shortCountryName = SHOR_COUNTRY_NAME;

  constructor(
    public matchListService: MatchService
  ) { }

  ngOnInit() {
    this.createStandings();
  }

  /**
   *  @description Build the hashed table of group and its matches to prepare it for processing
   */
  setGroup(index, value) {
    if (!this.groupHash[index]) {
      this.groupHash[index] = [];
    }
    this.groupHash[index].push(value);
  }

  /**
  *  @description Create the Standings tab along with the goups and their teams
  */
  createStandings() {
    // Get the match teams to build teams model
    this.matchListService.getFootballTeams().subscribe((res: any) => {
      if (res.teams) {
        TeamFormatter.format(res.teams);
        // Get the match teams to build the groups
        this.matchListService.getFootballMatchList().subscribe((res: any) => {
          if (res.matches) {
            res.matches.forEach(element => {
              this.setGroup(element.group, element);
            });
            this.formattedGroups = MatchFormatter.format(this.groupHash);
          }
        });
      }
    });


  }

}
