import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";

/**
 * Service for interacting with the backend API.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiRoot = new URL(environment.APIURL);

  private get versionURL(): URL {
    return new URL('version', this.apiRoot);
  }

  private get healthURL(): URL {
    return new URL('health', this.apiRoot);
  }

  constructor(private http: HttpClient) { }

  /**
   * Fetches the version number from the backend API.
   * @returns An observable that emits the version information as a string.
   */
  versionGet() {
    return this.http.get(this.versionURL.href, { responseType: 'text' });
  }

  /**
   * Retrieves a summary of backend health checks from the API.
   * @returns An observable that emits a JSON object containing the health status summary.
   */
  healthGet(): Observable<any> {
    return this.http.get<any>(this.healthURL.href);
  }
}
