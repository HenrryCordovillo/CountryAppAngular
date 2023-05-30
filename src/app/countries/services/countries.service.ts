import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../interfaces/country';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  constructor(private http: HttpClient) {}

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError((error) => of(null))
    );
  }

  searchCapital(searchTerm: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.apiUrl}/capital/${searchTerm}`)
      .pipe(catchError((error) => of([])));
  }
  searchCountry(searchTerm: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.apiUrl}/name/${searchTerm}`)
      .pipe(catchError((error) => of([])));
  }
  searchRegion(searchTerm: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.apiUrl}/region/${searchTerm}`)
      .pipe(catchError((error) => of([])));
  }
}
