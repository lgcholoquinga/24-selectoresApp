import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { Region, SmallCountry } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.scss'],
})
export class SelectorPageComponent implements OnInit {
  public countries: SmallCountry[] = [];
  public borders: SmallCountry[] = [];

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly srvCountry: CountriesService
  ) {}

  ngOnInit(): void {
    this.onRegionChange();
    this.onCountryChanged();
  }

  get regions(): Region[] {
    return this.srvCountry.regions;
  }

  public onSave() {
    console.log(this.myForm.value);
  }

  onRegionChange(): void {
    this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => (this.borders = [])),
        switchMap(region => this.srvCountry.getCountriesByRegion(region))
      )
      .subscribe(countries => (this.countries = countries));
  }

  onCountryChanged(): void {
    this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('borders')!.setValue('')),
        filter((value: string) => value.length > 0),
        switchMap(border => this.srvCountry.getCountryByAlphaCode(border)),
        switchMap(country =>
          this.srvCountry.getCountryBordersByCode(country.borders)
        )
      )
      .subscribe(countries => (this.borders = countries));
  }
}
