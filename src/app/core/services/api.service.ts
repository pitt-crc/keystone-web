import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { jwtDecode } from "jwt-decode";
import { catchError, finalize, map, Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURL: URL = new URL(environment.apiURL);
  private authEndpoint: URL = new URL('authentication/new/', this.apiURL);
  private refreshEndpoint: URL = new URL('authentication/refresh/', this.apiURL);
  private blacklistEndpoint: URL = new URL('authentication/blacklist/', this.apiURL);

  constructor(private http: HttpClient) {}

  /**
   * Get the current JWT access token.
   * @returns The access token if available, otherwise null
   */
  private get accessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  /**
   * Set the JWT access token.
   * @param token The access token value
   */
  private set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  /**
   * Get the expiration time of the JWT access token.
   * @returns The expiration time of the access token in milliseconds if available, otherwise the current time
   */
  private get accessTokenExpiration(): number {
    if (this.accessToken) {
      return <number>jwtDecode(this.accessToken).exp * 1000;
    } else {
      return Date.now();
    }
  }

  /**
   * Get the current JWT refresh token.
   * @returns The refresh token if available, otherwise null
   */
  private get refreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  /**
   * Set the JWT refresh token.
   * @param token The refresh token value
   */
  private set refreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  /**
   * Get the expiration time of the refresh token.
   * @returns The expiration time of the refresh token in milliseconds if available, otherwise the current time
   */
  private get refreshTokenExpiration(): number {
    if (this.refreshToken) {
      return <number>jwtDecode(this.refreshToken).exp * 1000;
    } else {
      return Date.now();
    }
  }

  /**
   * Delete all local JWT data.
   */
  private clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  /**
   * Authenticate the current API session using the given credentials.
   * @param username The username
   * @param password The password
   * @returns An observable of the login request
   */
  public login(username: string, password: string): Observable<void> {
    return this.http.post(this.authEndpoint.href, {'username': username, 'password': password})
      .pipe(
        map((response: any) => {
          this.accessToken = response.access;
          this.refreshToken = response.refresh;
        })
      );
  }

  /**
   * Log out the current API session and clear any token data.
   * @returns An observable of the logout request
   */
  public logout(): Observable<void> {
    if (!this.isAuthenticated()) {
      return of(void 0);
    }

    return this.http.post<void>(this.blacklistEndpoint.href, { refresh: this.refreshToken }).pipe(
      catchError(err => of(void 0)),
      finalize(() => {
        this.clearTokens();
      })
    );
  }

  /**
   * Check if the current API session is authenticated.
   * @returns true if the user is authenticated, false otherwise
   */
  public isAuthenticated(): boolean {
    this.refreshOrClearTokens();
    return !!this.refreshToken;
  }

  /**
   * Perform a GET request against the backend API.
   * @param endpoint The endpoint to request
   * @returns An observable of the request
   */
  public get(endpoint: string): Observable<object> {
    this.refreshOrClearTokens();
    const url = new URL(endpoint, this.apiURL);
    return this.http.get(url.href, {headers: this.getAuthHeaders()});
  }

  /**
   * Perform a POST request against the backend API.
   * @param endpoint The endpoint to request
   * @param data The data to send
   * @returns An observable of the request
   */
  public post(endpoint: string, data: object): Observable<object> {
    this.refreshOrClearTokens();
    const url = new URL(endpoint, this.apiURL);
    return this.http.post(url.href, data, {headers: this.getAuthHeaders()});
  }

  /**
   * Perform a PUT request against the backend API.
   * @param endpoint The endpoint to request
   * @param data The data to send
   * @returns An observable of the request
   */
  public put(endpoint: string, data: object): Observable<object> {
    this.refreshOrClearTokens();
    const url = new URL(endpoint, this.apiURL);
    return this.http.put(url.href, data, {headers: this.getAuthHeaders()});
  }

  /**
   * Perform a PATCH request against the backend API.
   * @param endpoint The endpoint to request
   * @param data The data to send
   * @returns An observable of the request
   */
  public patch(endpoint: string, data: object): Observable<object> {
    this.refreshOrClearTokens();
    const url = new URL(endpoint, this.apiURL);
    return this.http.patch(url.href, data, {headers: this.getAuthHeaders()});
  }

  /**
   * Perform a DELETE request against the backend API.
   * @param endpoint The endpoint to request
   * @returns An observable of the request
   */
  public delete(endpoint: string): Observable<object> {
    this.refreshOrClearTokens();
    const url = new URL(endpoint, this.apiURL);
    return this.http.delete(url.href, {headers: this.getAuthHeaders()});
  }

  /**
   * Refresh the authentication token if necessary. If the current API session is not authenticated
   * or the authentication token is not expired, this method does nothing.
   */
  private refreshOrClearTokens(): void {
    // Only refresh the tokens if the user is logged in and the access token has expired
    const accessTokenExpired: boolean = !!this.accessTokenExpiration && Date.now() < this.accessTokenExpiration;
    if (!accessTokenExpired) {
      return;
    }

    // If the refresh token has expired, the user is effectively logged out. Clear the tokens.
    const refreshTokenExpired: boolean = !!this.refreshTokenExpiration && Date.now() < this.refreshTokenExpiration;
    if (refreshTokenExpired) {
      this.clearTokens();
      return;
    }

    const refreshHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post(
      this.refreshEndpoint.href, {refresh: this.refreshToken}, {headers: refreshHeaders}
    ).subscribe({
      next: (response: any) => {
        this.accessToken = response.access;
      },
      error: (err) => {
        console.log(`Could not refresh auth tokens ${err}`)
        this.clearTokens()
      }
    });
  }

  /**
   * Retrieve the authentication headers.
   * @returns HttpHeaders containing the authentication token if available
   */
  private getAuthHeaders(): HttpHeaders {
    if (this.accessToken) {
      return new HttpHeaders({'Authorization': 'Bearer ' + this.accessToken});
    } else {
      return new HttpHeaders();
    }
  }
}
