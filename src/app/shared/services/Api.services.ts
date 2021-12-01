import { ApiResponse } from './../models/ApiResponse';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
export class ApiService {
  model: any = {};
  baseUrl: string;
  apiurl: string;
  constructor(protected httpClient: HttpClient, protected url: string = '') {
    this.apiurl = this.url;
  }
  public post<T>(item: any, url: string): Observable<ApiResponse<T>> {
    return this.httpClient.post<ApiResponse<T>>(`${url}`, item);
  }

  public createBaseUrl<T>(item: T, url: string): Observable<ApiResponse<T>> {
    return this.httpClient.post<ApiResponse<T>>(`${url}`, item);
  }
  update<T>(resource: any, url: any): Observable<ApiResponse<T>> {
    return this.httpClient.put<ApiResponse<T>>(`${url}`, resource);
  }
  Get<T>(id: any, url: any): Observable<ApiResponse<T>> {
    return this.httpClient.get<ApiResponse<T>>(`${url}` + '/' + id);
  }
  GetWithQueryString<T>(input: any, url) {
    return this.httpClient.get<ApiResponse<T>>(
      `${url}` + '?' + this.toQueryString(input)
    );
  }
  GetDataWithFilter<T>(query: any, url: any): Observable<ApiResponse<T>> {
    return this.httpClient.get<ApiResponse<T>>(
      `${url}` + '?' + this.toQueryString(query)
    );
  }
  GetAll<T>(url: any): Observable<ApiResponse<T>> {
    return this.httpClient.get<ApiResponse<T>>(`${url}`);
  }
  toQueryString(queryString) {
    const parts = [];

    for (const property in queryString) {
      const value = queryString[property];
      if (value !== null && value !== undefined) {
        parts.push(
          encodeURIComponent(property) + '=' + encodeURIComponent(value)
        );
      }
    }
    return parts.join('&');
  }
}
