import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
  }),
};
export abstract class ApiService<T> {
  basePath = environment.apiUrl;
  apiURL = this.basePath + 'api/';

  constructor(
    protected httpClient: HttpClient,
    protected actionUrl: string
  ) { }

  public get(url?: string): Observable<T[]> {
    return this.httpClient.get<T[]>(
      `${this.apiURL}${this.actionUrl}`,
      httpOptions
    );
  }

  public getUrl(url?: string): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiURL}${this.actionUrl}/${url}`,
      httpOptions
    );
  }
}
