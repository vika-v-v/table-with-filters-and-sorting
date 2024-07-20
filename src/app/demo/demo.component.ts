import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { FilterType } from '../table/filter-type.enum';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [
    TableComponent
  ],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent {
  carsTableHeader = [
    { "wert": "Rented On", "typ": FilterType.Date },
    { "wert": "Brand", "typ": FilterType.Object },
    { "wert": "Price for hour", "typ": FilterType.Decimal },
    { "wert": "Customer", "typ": FilterType.Text }
  ];

  carsTableData = [
    ["2021-01-01", "Audi", 10.5, "Max Bauer"],
    ["2021-02-01", "BMW", 12.5, "Erika Meyer"],
    ["2021-03-01", "Mercedes", 15.5, "Hans Becker"],
    ["2021-03-02", "Mercedes", 15.5, "Anna Schmitz"],
    ["2021-04-01", "VW", 8.5, "Lisa Fischer"],
    ["2021-05-01", "Ford", 9.5, "Peter Müller"],
    ["2021-06-01", "Opel", 7.5, "Maria Schneider"],
    ["2021-07-01", "Toyota", 11.5, "Paul Weber"],
    ["2021-08-01", "Fiat", 6.5, "Karin Hoffmann"],
    ["2021-09-01", "Renault", 9.5, "Stefan Schmitt"],
    ["2021-09-01", "Renault", 9.5, "Stefan Schmitt"],
    ["2021-09-01", "Renault", 9.5, "Stefan Schmitt"],
    ["2021-09-01", "Renault", 9.5, "Stefan Schmitt"],
    ["2021-09-01", "Renault", 9.5, "Stefan Schmitt"],
    ["2021-09-01", "Renault", 9.5, "Stefan Schmitt"],
    ["2021-09-01", "Renault", 9.5, "Stefan Schmitt"],
    ["2021-09-01", "Renault", 9.5, "Stefan Schmitt"],
    ["2021-09-01", "Renault", 9.5, "Stefan Schmitt"],
    ["2021-09-01", "Renault", 9.5, "Stefan Schmitt"],
    ["2021-09-01", "Renault", 9.5, "Stefan Schmitt"],
    ["2021-09-01", "Renault", 9.5, "Stefan Schmitt"],
    ["2021-09-01", "Renault", 9.5, "Stefan Schmitt"],
    ["2021-09-01", "Renault", 9.5, "Stefan Schmitt"],
    ["2021-09-01", "Renault", 9.5, "Stefan Schmitt"],
    ["2021-09-01", "Renault", 9.5, "Stefan Schmitt"]
  ]

  citiesTableHeader = [
    { "wert": "Name", "typ": FilterType.Text },
    { "wert": "Population", "typ": FilterType.Number },
    { "wert": "Country", "typ": FilterType.Object },
    { "wert": "Visited on", "typ": FilterType.Date },
    { "wert": "Notes", "typ": FilterType.Text }
  ];

  citiesTableData = [
    ["Berlin", 3500000, "Germany", "2021-01-01", "Capital"],
    ["Berlin", 3500000, "Germany", "2021-01-01", "Capital"],
    ["Paris", 2000000, "France", "2021-02-01", "City of Love"]
  ];
}
