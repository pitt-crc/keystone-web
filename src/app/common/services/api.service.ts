import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURL: URL = new URL(environment.apiURL);
  private authEndpoint: URL = new URL('authentication/new/', this.apiURL);
  private refreshEndpoint: URL = new URL('authentication/refresh/', this.apiURL);

  constructor(private http: HttpClient) {}

  /**
   * Check if the current API session is authenticated.
   * @returns true if the user is authenticated, false otherwise
   */
  public isAuthenticated(): boolean {
    this.refreshAuthToken();
    return !!localStorage.getItem('accessToken');
  }

  /**
   * Authenticate the current API session using the given credentials.
   * @param username The username
   * @param password The password
   * @returns An observable of the login request
   */
  public login(username: string, password: string): Observable<any> {
    return this.http.post(this.authEndpoint.href, {'username': username, 'password': password})
      .pipe(
        map((response: any) => {
            localStorage.setItem('accessToken', response.access);
            localStorage.setItem('refreshToken', response.refresh);
          }
        ));
  }

  /**
   * Log out the current API session.
   */
  public logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  /**
   * Perform a GET request against the backend API.
   * @param endpoint The endpoint to request
   * @returns An observable of the request
   */
  public get(endpoint: string): Observable<object> {
    this.refreshAuthToken();
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
    this.refreshAuthToken();
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
    this.refreshAuthToken();
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
    this.refreshAuthToken();
    const url = new URL(endpoint, this.apiURL);
    return this.http.patch(url.href, data, {headers: this.getAuthHeaders()});
  }

  /**
   * Perform a DELETE request against the backend API.
   * @param endpoint The endpoint to request
   * @returns An observable of the request
   */
  public delete(endpoint: string): Observable<object> {
    this.refreshAuthToken();
    const url = new URL(endpoint, this.apiURL);
    return this.http.delete(url.href, {headers: this.getAuthHeaders()});
  }

  /**
   * Refresh the authentication token if necessary. If the current API session is not authenticated
   * or the authentication token is not expired, this method does nothing.
   */
  private refreshAuthToken(): void {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // Only refresh the token if the user is logged in and the token has expired
    const now = new Date().getDate()
    if (!accessToken || now < <number>jwtDecode(accessToken).exp) {
      return;
    }

    // If the refresh fails, assume the refresh token is expired and log the user out
    const refreshHeaders = new HttpHeaders({'Content-Type': 'application/json'})
    this.http.post(this.refreshEndpoint.href, {refresh: refreshToken}, {headers: refreshHeaders}).subscribe({
      next: (response: any) => {
        localStorage.setItem('accessToken', response.access);
      },
      error: () => {
        this.logout();
      }
    });
  }

  /**
   * Retrieve the authentication headers.
   * @returns HttpHeaders containing the authentication token if available
   */
  private getAuthHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      return new HttpHeaders({
        'Authorization': 'Bearer ' + accessToken
      });
    } else {
      return new HttpHeaders();
    }
  }
}
