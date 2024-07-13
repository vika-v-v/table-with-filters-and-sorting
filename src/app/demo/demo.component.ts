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
    { "wert": "Number", "typ": FilterType.Text },
    { "wert": "Customer", "typ": FilterType.Text }
  ];

  carsTableData = [
    ["2004-31-01", "Audi", 10.5, "123", "Max Mustermann"],
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
    ["Paris", 2000000, "France", "2021-02-01", "City of Love"]
  ];
}
