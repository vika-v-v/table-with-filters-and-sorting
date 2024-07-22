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
    { "value": "Rented On", "type": FilterType.Date },
    { "value": "Brand", "type": FilterType.Object },
    { "value": "Price for hour", "type": FilterType.Decimal },
    { "value": "Customer", "type": FilterType.Text }
  ];

  carsTableData = [
    ["2021-01-01", "Audi", 10.5, "Max Bauer"],
    ["2022-02-10", "BMW", 12.5, "Erika Meyer"],
    ["2022-03-01", "Mercedes", 15.5, "Hans Becker"],
    ["2022-09-02", "Mercedes", 15.5, "Anna Schmitz"],
    ["2022-04-01", "VW", 8.5, "Lisa Fischer"],
    ["2023-05-05", "Ford", 9.5, "Peter Müller"],
    ["2023-06-01", "Opel", 7.5, "Maria Schneider"],
    ["2023-07-01", "Toyota", 11.5, "Paul Weber"],
    ["2023-08-02", "Fiat", 6.5, "Karin Hoffmann"],
    ["2023-09-01", "Renault", 9.5, "Stefan Schmitt"],
    ["2024-07-20", "VW", 18.0, "Michael Krüger"],
    ["2024-07-21", "Renault", 25.0, "Laura Zimmermann"],
    ["2024-07-19", "Audi", 20.0, "Johanna Braun"],
    ["2024-07-14", "BMW", 22.0, "Lucas Schmidt"],
    ["2024-07-10", "Mercedes", 24.5, "Nina Keller"],
    ["2024-07-05", "VW", 19.0, "Klaus Richter"],
    ["2024-06-30", "Ford", 21.0, "Marta Schulz"],
    ["2024-06-15", "Opel", 17.5, "Anna Vogel"],
    ["2024-05-01", "Toyota", 20.5, "Ralf Fischer"],
    ["2024-04-10", "Fiat", 16.0, "Eva Weiß"],
    ["2024-03-25", "Renault", 14.5, "Sven Hoffmann"],
    ["2024-02-14", "BMW", 15.0, "Gabi Lehmann"],
    ["2024-01-30", "Mercedes", 20.0, "Uwe Zimmer"],
    ["2024-01-15", "VW", 18.0, "Jana Schuster"],
    ["2024-01-01", "Ford", 19.0, "Hans Meier"],
    ["2023-12-20", "Opel", 17.5, "Lena Becker"],
    ["2023-12-05", "Toyota", 20.5, "Karl Schmitt"],
    ["2023-11-30", "Fiat", 16.0, "Marie Schuster"],
    ["2023-11-15", "Renault", 14.5, "Hans Müller"],
    ["2023-10-30", "Audi", 20.0, "Eva Schmidt"],
    ["2023-10-15", "BMW", 22.0, "Klaus Fischer"],
    ["2023-10-01", "Mercedes", 24.5, "Anna Schuster"],
    ["2023-09-15", "VW", 19.0, "Peter Meier"],
    ["2023-09-01", "Ford", 21.0, "Lisa Becker"],
    ["2023-08-15", "Opel", 17.5, "Paul Schmitt"],
    ["2023-08-01", "Toyota", 20.5, "Maria Schuster"],
    ["2023-07-15", "Fiat", 16.0, "Peter Müller"],
    ["2023-07-01", "Renault", 14.5, "Lisa Fischer"],
    ["2023-06-15", "Audi", 20.0, "Paula Schmitt"],
    ["2023-06-01", "BMW", 22.0, "Hans Meier"],
    ["2023-05-15", "Mercedes", 24.5, "Lena Becker"],
    ["2023-05-01", "VW", 19.0, "Karl Schmitt"],
    ["2023-04-15", "Ford", 21.0, "Marie Schuster"],
    ["2023-04-01", "Opel", 17.5, "Hans Müller"]
  ]

  citiesTableHeader = [
    { "value": "Name", "type": FilterType.Text },
    { "value": "Population", "type": FilterType.Number },
    { "value": "Country", "type": FilterType.Object },
    { "value": "Notes", "type": FilterType.Text }
  ];

  citiesTableData = [
    ["Berlin", 3645000, "Germany", "Berlin, the capital of Germany, is home to the largest train station in Europe, the Berlin Hauptbahnhof."],
    ["Mannheim", 309370, "Germany", "Mannheim is famous for its unique grid layout, where streets intersect at right angles, creating a checkerboard pattern."],
    ["Hamburg", 1841000, "Germany", "Hamburg is the city with the most bridges of any city in the world. With over 2,500 bridges, it surpasses Venice, Amsterdam, and London combined."]
  ];
}
