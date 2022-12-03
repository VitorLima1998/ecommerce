import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Category } from '../model/category';

const baseUrl = 'http://localhost:3000/api/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  CATEGORIES: Category[] = [];
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(baseUrl);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(baseUrl, category);
  }

  removeCategory(id: string): Observable<Category> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http
      .post(baseUrl, category, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError(
      () =>
        'There is a problem with the service. We are notified & working on it. Please try again later.'
    );
  }
}
