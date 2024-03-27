import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offre } from '../model/product/offre.module';

@Injectable({
  providedIn: 'root'
})
export class OffreService {
  api: string = 'http://localhost:8000/api/offre';

  constructor(private http:HttpClient) { }


 getoffres():Observable<Offre[]>{
  return this.http.get<Offre[]>(this.api)
 }

}
