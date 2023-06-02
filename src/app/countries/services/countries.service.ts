import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../interfaces/country';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };
  constructor(private http: HttpClient) {}
  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/${url}`).pipe(
      catchError((error) => of([]))
      // delay(2000)
    );
  }
  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError((error) => of(null))
    );
  }

  searchCapital(searchTerm: string): Observable<Country[]> {
    return this.getCountriesRequest(`capital/${searchTerm}`).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byCapital = { term: searchTerm, countries })
      )
    );
  }
  searchCountry(searchTerm: string): Observable<Country[]> {
    return this.getCountriesRequest(`name/${searchTerm}`).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byCountries = { term: searchTerm, countries })
      )
    );
  }
  searchRegion(searchTerm: Region): Observable<Country[]> {
    return this.getCountriesRequest(`region/${searchTerm}`).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byRegion = { region: searchTerm, countries })
      )
    );
  }
}
