import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private expirationTime: Date | null = null;

  private apiURL: URL = new URL(environment.apiURL);
  private authEndpoint: URL = new URL('authentication/new/', this.apiURL);
  private refreshEndpoint: URL = new URL('authentication/refresh/', this.apiURL);

  constructor(private http: HttpClient) {}

  /**
   * Check if the current API session is authenticated.
   * @returns true if the user is authenticated, false otherwise
   */
  public isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  /**
   * Log in a user with the given credentials.
   * @param username The username
   * @param password The password
   * @returns An observable of the login request
   */
  public login(username: string, password: string): Observable<any> {
    return this.http.post(this.authEndpoint.href, {'username': username, 'password': password})
      .pipe(
        map((response: any) => {
            this.accessToken = response.access;
            this.refreshToken = response.refresh;
            this.expirationTime = new Date(<number>jwtDecode(<string>this.accessToken).exp)
          }
        ));
  }

  /**
   * Log out the current API session.
   */
  public logout(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.expirationTime = null;
  }

  /**
   * Perform a GET request.
   * @param endpoint The endpoint to request
   * @returns An observable of the request
   */
  public get(endpoint: string): Observable<any> {
    this.refreshAuthToken();
    const url = new URL(endpoint, this.apiURL);
    return this.http.get(url.href, {headers: this.getAuthHeaders()});
  }

  /**
   * Perform a POST request.
   * @param endpoint The endpoint to request
   * @param data The data to send
   * @returns An observable of the request
   */
  public post(endpoint: string, data: object): Observable<any> {
    this.refreshAuthToken();
    const url = new URL(endpoint, this.apiURL);
    return this.http.post(url.href, {headers: this.getAuthHeaders()});
  }

  /**
   * Perform a PUT request.
   * @param endpoint The endpoint to request
   * @param data The data to send
   * @returns An observable of the request
   */
  public put(endpoint: string, data: object): Observable<any> {
    this.refreshAuthToken();
    const url = new URL(endpoint, this.apiURL);
    return this.http.put(url.href, data, {headers: this.getAuthHeaders()});
  }

  /**
   * Perform a PATCH request.
   * @param endpoint The endpoint to request
   * @param data The data to send
   * @returns An observable of the request
   */
  public patch(endpoint: string, data: object): Observable<any> {
    this.refreshAuthToken();
    const url = new URL(endpoint, this.apiURL);
    return this.http.patch(url.href, data, {headers: this.getAuthHeaders()});
  }

  /**
   * Perform a DELETE request.
   * @param endpoint The endpoint to request
   * @returns An observable of the request
   */
  public delete(endpoint: string): Observable<any> {
    this.refreshAuthToken();
    const url = new URL(endpoint, this.apiURL);
    return this.http.delete(url.href, {headers: this.getAuthHeaders()});
  }

  /**
   * Refresh the authentication token if necessary. If the current API session is not authenticated
   * or the authentication token is not expired, this method does nothing.
   */
  private refreshAuthToken(): void {
    // Only refresh the token if the user is logged in and the token has expired
    const now = new Date()
    if (this.isAuthenticated() || now >= <Date>this.expirationTime) {
      return;
    }

    // If the refresh fails, assume the refresh taken is expired and log the user out
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

  /**
   * Retrieves the authentication headers.
   * @returns HttpHeaders containing the authentication token if available
   */
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
