import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product/product.module';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
@Injectable({
  providedIn: 'root'
})

export class ProductService {
  updatecomponent= new Subject<Product>();
  update(produit:Product){
    this.updatecomponent.next(produit);
}
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
  addProduct(produit: any): Observable<any> {
    console.log(produit);
    return this.http.post<any>(this.api, produit);
  }
  getrole(){
    let role = 'admin';
    return role;
  }
  updateProduct(produit:any):Observable<any>{
    return this.http.post<any>(this.api+'u/'+produit.get('id'),produit);
  }
deleteProduct(id: number): Observable<number> {
  return this.http.delete<any>(this.api + '/' + id);
}


}

