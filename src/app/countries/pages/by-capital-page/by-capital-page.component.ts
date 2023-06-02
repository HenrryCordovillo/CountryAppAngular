import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [],
})
export class ByCapitalPageComponent implements OnInit {
  countries: Country[] = [];
  public isLoading: boolean = false;
  initialValue: string = '';
  constructor(private countriesService: CountriesService) {}
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }
  searchByCapital(searchTerm: string) {
    this.isLoading = true;
    this.countriesService.searchCapital(searchTerm).subscribe((resp) => {
      this.countries = resp;
      this.isLoading = false;
    });
  }
}
