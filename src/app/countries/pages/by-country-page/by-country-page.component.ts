import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [],
})
export class ByCountryPageComponent {
  countries: Country[] = [];
  constructor(private countriesService: CountriesService) {}
  searchByCountry(searchTerm: string) {
    this.countriesService
      .searchCountry(searchTerm)
      .subscribe((resp) => (this.countries = resp));
  }
}
