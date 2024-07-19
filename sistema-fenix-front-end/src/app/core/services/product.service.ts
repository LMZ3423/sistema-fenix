import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ProductModel } from '../../shared/components/model/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/api/v1';

constructor(private http: HttpClient) { }

getProductList(): Observable<any> {
  const token = localStorage.getItem('authToken');
  let headers = new HttpHeaders();
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }
  return this.http.get<any>(this.apiUrl + "/list", { headers });
}

addProduct(productName: ProductModel): Observable<any> {
  const token = localStorage.getItem('authToken');
  let headers = new HttpHeaders();
  
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }
  
  const body = { productName }; // Objeto con los datos del producto a agregar
  console.log('que mandé:  '  , productName);
  return this.http.post<any>(this.apiUrl + "/add", productName, { headers }).pipe(
    catchError((error) => {
      throw error; // Manejo de errores opcional, dependiendo de tu lógica
    })
  );
}

  updateProductStatus(product: ProductModel): Observable<any> {
    const token = localStorage.getItem('authToken');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.put<any>(`${this.apiUrl}/updateStatus`, product, { headers });
  }

  addProductEntry(product: ProductModel): Observable<any> {
    const token = localStorage.getItem('authToken');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.put<any>(`${this.apiUrl}/entry`, product, { headers });
  }

  addOutput(product: ProductModel): Observable<any> {
    const token = localStorage.getItem('authToken');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.put<any>(`${this.apiUrl}/output`, product, { headers });
  }

  getMovementHistory(): Observable<any> {
    const token = localStorage.getItem('authToken');
    let headers = new HttpHeaders();
  
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  
    return this.http.get<any>(`${this.apiUrl}/history`, { headers }).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }


}






