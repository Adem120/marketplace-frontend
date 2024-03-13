import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from '../model/product/categorie.module';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  api: string = 'http://localhost:8000/api/cat';


  constructor(private http:HttpClient) { }
  getCategorie():Observable<Categorie[]>{
    return this.http.get<Categorie[]>(this.api);
  }
}
