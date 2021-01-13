import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {Category} from "../model/category";

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  url = 'http://127.0.0.1:8085/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + "categories");
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(this.url + "categories/" + id)
  }
}
