import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Photo} from '../photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private photoUrl = 'http://localhost:8443/photo/';

  constructor(private http: HttpClient) {
  }

  uploadFile(formData: FormData): Observable<Photo> {
    return this.http.post<Photo>(this.photoUrl + 'uploadFile', formData);
  }
}
