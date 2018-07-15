import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { CommitsOverview, CommitDetails } from '../data';

const API = 'https://api.github.com/repos/';
export const GITHUB_REPO = new InjectionToken<string>('github-repo');
export const TOKEN = new InjectionToken<string>('token');

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {

  constructor(
    private http: HttpClient,
    @Inject(GITHUB_REPO) private repo: string,
    @Inject(TOKEN) private token: string,
  ) { }

  getAll(pageNumber?: number, since?: Date, until?: Date): Observable<CommitsOverview> {
    let params = new HttpParams();
    if (pageNumber) {
      params = params.set('page', pageNumber.toString());
    }

    if (since) {
      params = params.set('since', since.toISOString());
    }

    if (until) {
      params = params.set('until', until.toISOString());
    }

    return this.http.get<CommitDetails[]>(API + this.repo + '/commits', {
      headers: {'Authorization': this.token },
      params, observe: 'response'
     }).pipe(
      map(resp => {
        let lastPageNumber = 1;
        if (resp.headers.has('Link')) {
          lastPageNumber = this.retrieveLastPageNumber(resp.headers.get('Link'));
        }

        return {
          commits: resp.body,
          lastPageNumber,
        };
      }),
    );
  }

  private retrieveLastPageNumber(linkHeader: string): number {
    if (typeof linkHeader !== 'string') {
      return 1;
    }

    const links = linkHeader.split(',');

    for (const link of links) {
      const [url, rel] = link.split(';');

      if (/"last"/.test(rel)) {
        const match = /page=([0-9]+)/.exec(url);
        return match && match.length > 1 ? parseInt(match[1], 10) : 1;
      }
    }
  }
}
