import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent {
  countries: Country[] = [];
  constructor(private countriesService: CountriesService) {}
  searchByRegion(searchTerm: string) {
    this.countriesService
      .searchRegion(searchTerm)
      .subscribe((resp) => (this.countries = resp));
  }
}
