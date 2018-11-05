import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Log } from 'ng2-logger/client';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

const log = Log.create('api-endpoints.service.ts');

@Injectable()
/**
 * @author Malek Motan, 2018
 * */
export class ApiEndpoints {
  private token = '0e5f9fb23b4b466da63728525fa2650d';
  private baseUrl = 'http://api.football-data.org/v2';
  constructor(
    private httpService: HttpClient) {
  }

  /**
   * @description Get the endopints of the services to be called
   */
  endpoints() {
    return {
      getFootballMatches: (stage) => `${this.baseUrl}/competitions/2000/matches`,
      getFootballTeams: () => `${this.baseUrl}/competitions/2000/teams`
    };
  }

  /**
   * @description Get the default request headers
   */
  getHeaders() {

    return new HttpHeaders({
      'x-auth-token': `${this.token}`
    });
  }

  /**
   * @description This method is used to get HTTP requests to the desired endpoint.
   * @param  {string} route
   * @param  {object} requestBody
   * @param  {object} pathParams
   * @returns {object} http response
   */
  get(route, requestBody, pathParams?) {
    return Observable.create((observer: Observer<any>) => {
      const url = this.endpoints()[route](pathParams);
      const params: URLSearchParams = new URLSearchParams();
      // tslint:disable-next-line:forin
      for (const key in requestBody) {
        params.set(key, requestBody[key]);
      }

      const headers = this.getHeaders();
      const requestOptions = {
        headers: headers,
        params: requestBody
      };

      return this.httpService.get(url, requestOptions)
        .subscribe(
          (data: any) => {
            log.i('GET:Success---', data);
            observer.next(data);
          },
          error => {
            log.er('GET:Error---', error);
            observer.error(error);
          }
        );
    });
  }

}
