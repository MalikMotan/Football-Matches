import { Injectable } from '@angular/core';

// Custom services
import { ApiEndpoints } from './api-endpoints.service';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(
    private api: ApiEndpoints
  ) { }

  /**
   * @returns Obsarvable: includes match list and their metadata
   */
  getFootballMatchList(groupName?) {
    const pathParams = { stage: 'GROUP_STAGE' };
    if (groupName) {
      pathParams['group'] = groupName;
    }

    return this.api.get('getFootballMatches', pathParams);
  }

  /**
  * @returns Obsarvable: includes teams list and their metadata
  */
  getFootballTeams() {

    return this.api.get('getFootballTeams', null);
  }
}
