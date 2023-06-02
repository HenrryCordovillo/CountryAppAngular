import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [],
})
export class ByCountryPageComponent implements OnInit {
  countries: Country[] = [];
  public isLoading: boolean = false;
  initialValue: string = '';
  constructor(private countriesService: CountriesService) {}
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }
  searchByCountry(searchTerm: string) {
    this.isLoading = true;

    this.countriesService.searchCountry(searchTerm).subscribe((resp) => {
      this.countries = resp;
      this.isLoading = false;
    });
  }
}
