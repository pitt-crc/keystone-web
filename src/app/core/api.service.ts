import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private apiURL: URL = new URL(environment.apiURL);
  private authEndpoint: URL = new URL('authentication/new/', this.apiURL);
  private refreshEndpoint: URL = new URL('authentication/refresh/', this.apiURL);

  constructor(private http: HttpClient) {}

  public isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  public login(username: string, password: string): void {
    this.http.post(this.authEndpoint.href, {'username': username, 'password': password})
      .subscribe({
        next: (response: any) => {
          this.accessToken = response.access;
          this.refreshToken = response.refresh;
        }
      });
    console.log(this.accessToken)
  }

  public logout(): void {
    this.accessToken = null;
    this.refreshToken = null;
  }

  public get(endpoint: string): Observable<any> {
    this.refreshAuthToken();
    const url = new URL(endpoint, this.apiURL);
    return this.http.get(url.href, {headers: this.getAuthHeaders()});
  }

  public post(endpoint: string, data: object): Observable<any> {
    this.refreshAuthToken();
    const url = new URL(endpoint, this.apiURL);
    return this.http.post(url.href, {headers: this.getAuthHeaders()});
  }

  public put(endpoint: string, data: object): Observable<any> {
    this.refreshAuthToken();
    const url = new URL(endpoint, this.apiURL);
    return this.http.put(url.href, data, {headers: this.getAuthHeaders()});
  }

  public patch(endpoint: string, data: object): Observable<any> {
    this.refreshAuthToken();
    const url = new URL(endpoint, this.apiURL);
    return this.http.patch(url.href, data, {headers: this.getAuthHeaders()});
  }

  public delete(endpoint: string): Observable<any> {
    this.refreshAuthToken();
    const url = new URL(endpoint, this.apiURL);
    return this.http.delete(url.href, {headers: this.getAuthHeaders()});
  }

  private refreshAuthToken(): void {

    if (!this.refreshToken) {
      return
    }

    const refreshData = {refreshToken: this.refreshToken};
    const refreshHeaders = new HttpHeaders({'Content-Type': 'application/json'})

    this.http.post(this.refreshEndpoint.href, refreshData, {headers: refreshHeaders}).subscribe({
      next: (response: any) => {
        this.accessToken = response.access;
      },
      error: (error) => {
        this.logout();
        throw new Error('Could not refresh token. Logging user out.');
      }
    });
  }

  private getAuthHeaders(): HttpHeaders {
    if (this.accessToken) {
      return new HttpHeaders({
        'Authorization': 'Bearer ' + this.accessToken
      });
    } else {
      return new HttpHeaders();
    }
  }
}
