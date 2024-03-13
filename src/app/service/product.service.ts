import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product/product.module';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) { }
  api: string = 'http://localhost:8000/api/produit';
  getProductsSmall() {
      return this.http.get<any>('assets/demo/data/products-small.json')
          .toPromise()
          .then(res => res.data as Product[])
          .then(data => data);
  }

  getProducts() :Observable<Product[]>{
    return this.http.get<Product[]>(this.api);
  }



}

