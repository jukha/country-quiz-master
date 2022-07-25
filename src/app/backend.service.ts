import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private httpObj: HttpClient) {}
  url = 'https://restcountries.com/v3.1/all';

  getCountries(): Observable<any> {
    return this.httpObj.get(this.url);
  }
}
