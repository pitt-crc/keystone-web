import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { jwtDecode } from "jwt-decode";
import { catchError, map, Observable } from 'rxjs';

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
   * @returns The expiration time of the access token if available, otherwise null
   */
  private get accessTokenExpiration(): number | null {
    if (this.accessToken) {
      return <number>jwtDecode(this.accessToken).exp * 1000;
    } else {
      return null;
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
   * @returns The expiration time of the refresh token if available, otherwise null
   */
  private get refreshTokenExpiration(): number | null {
    if (this.refreshToken) {
      return <number>jwtDecode(this.refreshToken).exp * 1000;
    } else {
      return null;
    }
  }

  /**
   * Delete all JWT token data.
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
        }));
  }

  /**
   * Log out the current API session and clear any token data.
   */
  public logout(): Observable<void> {
    this.clearTokens();
    return this.http.post(this.blacklistEndpoint.href, {refresh: this.refreshToken});
  }

  /**
   * Check if the current API session is authenticated.
   * @returns true if the user is authenticated, false otherwise
   */
  public isAuthenticated(): boolean {
    this.refreshAuthTokens();
    return !!this.refreshToken;
  }

  /**
   * Perform a GET request against the backend API.
   * @param endpoint The endpoint to request
   * @returns An observable of the request
   */
  public get(endpoint: string): Observable<object> {
    this.refreshAuthTokens();
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
    this.refreshAuthTokens();
    const url = new URL(endpoint, this.apiURL);
    return this.http.post(url.href, data,{headers: this.getAuthHeaders()});
  }

  /**
   * Perform a PUT request against the backend API.
   * @param endpoint The endpoint to request
   * @param data The data to send
   * @returns An observable of the request
   */
  public put(endpoint: string, data: object): Observable<object> {
    this.refreshAuthTokens();
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
    this.refreshAuthTokens();
    const url = new URL(endpoint, this.apiURL);
    return this.http.patch(url.href, data, {headers: this.getAuthHeaders()});
  }

  /**
   * Perform a DELETE request against the backend API.
   * @param endpoint The endpoint to request
   * @returns An observable of the request
   */
  public delete(endpoint: string): Observable<object> {
    this.refreshAuthTokens();
    const url = new URL(endpoint, this.apiURL);
    return this.http.delete(url.href, {headers: this.getAuthHeaders()});
  }

  /**
   * Refresh the authentication token if necessary. If the current API session is not authenticated
   * or the authentication token is not expired, this method does nothing.
   */
  private refreshAuthTokens(): void {
    // Only refresh the token if the user is logged in and the token has expired
    if (!this.refreshTokenExpiration || Date.now() < this.refreshTokenExpiration) {
      return;
    }

    // If the refresh fails, assume the refresh token is expired and log the user out
    const refreshHeaders = new HttpHeaders({'Content-Type': 'application/json'})
    this.http.post(this.refreshEndpoint.href, {refresh: this.refreshToken}, {headers: refreshHeaders}).pipe(
        map((response: any) => {
          this.accessToken = response.access;
        }),
        catchError(this.logout)
    );
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
