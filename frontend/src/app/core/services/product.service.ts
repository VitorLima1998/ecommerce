import { Observable, catchError, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';

const baseUrl = 'http://localhost:3000/api/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  PRODUCTS: Product[] = [];
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl);
  }

  updateProducts(product: Product): Observable<Product> {
    return this.http.put<Product>(baseUrl, product);
  }

  removeProduct(id: string): Observable<Product> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http
      .post(baseUrl, product, {
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
