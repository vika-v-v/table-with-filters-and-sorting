import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RangeSliderComponent } from './range-slider/range-slider.component';
import { tableConfig } from './table-config.const';
import { CustomDropdownComponent } from './custom-dropdown/custom-dropdown.component';
import { FilterType } from './filter-type.enum';
import { themeColors } from './theme-colors';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RangeSliderComponent,
    CustomDropdownComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  FilterType = FilterType;

  // Here the data for the table is passed
  @Input() tableHeader: any[] = [];
  @Input() tableData: any[] = [];
  @Input() name: string = '';
  @Input() errorEmpty: string = 'Not yet available.';
  @Input() theme: 'light' | 'dark' = 'light';

  // Formatted input data, which specify, among other things, whether a row should be displayed
  tableDataFormatted: any[] = [];
  tableHeaderFormatted: any[] = [];
  private initialTableDataFormatted: any[] = [];

  // Information about which sorts and filters are selected
  filterSortPopup: any | null = null;

  popupPosition: any = {};
  private currentIcon: HTMLElement | null = null; // where filter was last opened

  private initialized = false;

  selectedDropdownOption: string = '';

  // open wide view
  wideOpen: boolean = false;

  // Elements that need to be accessed from the HTML layer
  @ViewChild('popup') popupRef!: ElementRef;
  @ViewChild('table') table!: ElementRef;

  themeColors = themeColors;

  private possibleFiltersAndSortings = tableConfig;

  ngOnInit () {
    this.initializeData();
    this.initialized = true;
  }

  // If the input data changes, the table will be regenerated
  ngOnChanges(changes: SimpleChanges) {
    if (this.initialized && changes['tableData']) {
      this.tableDataFormatted = [];
      this.tableHeaderFormatted = [];
      this.initialTableDataFormatted = [];

      this.initializeData();
    }
  }

  // Initialize tableDataFormatted and tableHeaderFormatted
  initializeData(): void {

    this.initHeaderData();
    this.initTableData();

    // für das Zurücksetzen der Filter und Sortierungen benötigt
    this.initialTableDataFormatted = [...this.tableDataFormatted];
  }

  showFilterSortPopup(column: any, placeNear: HTMLElement) {
    this.filterSortPopup = column;
    this.currentIcon = placeNear;

    setTimeout(() => {
    const rect = placeNear.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    // Position to the right of the icon
    let popupLeft = rect.left + scrollLeft;
    let popupTop = rect.bottom + 5 + scrollTop;

    // Wait until the element is positioned to check for overflow
    requestAnimationFrame(() => {
      const popupWidth = this.popupRef.nativeElement.offsetWidth;
      const popupHeight = this.popupRef.nativeElement.offsetHeight;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Adjust vertical position if the popup would exceed the edge of the screen
      if (popupLeft + popupWidth > screenWidth) {
        popupLeft = rect.right - popupWidth + scrollLeft;
      }

      // Adjust horizontal position if the popup would exceed the edge of the screen
      if (popupTop + popupHeight > screenHeight) {
        popupTop = rect.top - popupHeight + scrollTop;
      }

      this.popupPosition = { top: `${popupTop}px`, left: `${popupLeft}px` };
    });
  }, 1);
  }

  // Apply filter upon selection
  filterSelected() {
    // Reset filter
    this.tableDataFormatted.forEach((line: any) => {
      line.shown = true;
    });

    // Iterate through and apply each filter
    for (let i = 0; i < this.tableHeaderFormatted.length; i++) {
      let header = this.tableHeaderFormatted[i];
      header.filterUsed = false;

      for (let j = 0; j < header.filters.length; j++) {
        let filter = header.filters[j];

        // Call the corresponding method for the filter type
        if (header.type == FilterType.Date) {
          this.filterTypeDateAnwenden(filter, header, i);
        }
        else if (header.type == FilterType.Text) {
          this.filterTypeTextAnwenden(filter, i, header);
        }
        else if (header.type == FilterType.Number || header.type == FilterType.Decimal) {
          this.filterTypeNumberUndDecimalAnwenden(i, filter, header);
        }
        else if (header.type == FilterType.Object) {
          this.filterTypeObjectAnwenden(filter, i, header);
        }
      }
    }
  }

  // Apply sorting upon selection
  private sortingSelected(sorting: any, header: any) {

    // Validate input data

    if (!sorting.selected) return;

    const columnIndex = this.tableHeaderFormatted.findIndex(h => h === header);
    if (columnIndex < 0) return;

    // Apply sorting
    this.tableDataFormatted.sort((a, b) => {
      let valueA = a.row[columnIndex].value;
      let valueB = b.row[columnIndex].value;

      // Set sorting value separately for each filter type
      if (header.type === FilterType.Date) {
        valueA = this.parseDate(valueA).getTime();
        valueB = this.parseDate(valueB).getTime();
      }
      else if (header.type === FilterType.Text) {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
      else if (header.type === FilterType.Number || header.type === FilterType.Decimal) {
        valueA = parseFloat(valueA);
        valueB = parseFloat(valueB);
      }

      // Apply sorting
      if (sorting.key === 'asc') {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      } else {
        return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
      }
    });
  }

  // Toggle sorting, which requires the HTML element
  toggleSorting(sorting: any, header: any) {
    // Select sorting: reset all sortings and select the chosen sorting
    if (!sorting.selected) {
      this.tableHeaderFormatted.forEach((h: any) => {
        if (h.sortings != undefined) {
          h.sortings.forEach((s: any) => {
            s.selected = false;
          });
        }
      });
      sorting.selected = true;
      this.sortingSelected(sorting, header);
    }
    // Deselect sorting: reset all sortings
    else {
      sorting.selected = false;
      this.tableDataFormatted = [...this.initialTableDataFormatted];
    }
  }

  // When clicking outside the popup, the popup will close
  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    const targetElement = event.target as HTMLElement;

    if (this.filterSortPopup && this.popupRef) {
      const clickedInsidePopup = this.popupRef.nativeElement.contains(targetElement);
      const clickedInsideIcon = this.currentIcon?.contains(targetElement);

      if (!clickedInsideIcon && !clickedInsidePopup) {
        this.filterSortPopup = null;
      }
    }
  }

  // Iterate through all information in the table content and add necessary formatting according to the type
  private initTableData() {
    for (let j = 0; j < this.tableData.length; j++) {
      let row = [];
      for (let i = 0; i < this.tableHeader.length; i++) {
        let data: any = {};

        // Add formatting
        if (this.tableHeader[i].type == FilterType.Date) {
          data.value = this.formatDate(this.tableData[j][i]);
        }
        else if (this.tableHeader[i].type == FilterType.Decimal) {
          data.value = parseFloat(this.tableData[j][i]).toFixed(2);
        }
        else if (this.tableHeader[i].type == FilterType.Text) {
          data.value = this.tableData[j][i];
          data.highlightedRange = { start: -1, end: -1 };
        }
        else { // No formatting needed
          data.value = this.tableData[j][i];
        }

        row.push(data);
      }
      // Initially display all rows
      this.tableDataFormatted.push({ row, "shown": true });
    }
  }

  // Iterate through all information in the header and add corresponding filters and sortings
  private initHeaderData() {
    for (let i = 0; i < this.tableHeader.length; i++) {
      let headerObject: any = {};

      headerObject.value = this.tableHeader[i].value;
      headerObject.type = this.tableHeader[i].type;

      for (let filterSorting of this.possibleFiltersAndSortings) {
        if (filterSorting.FilterType == this.tableHeader[i].type) {

          // Add sortings
          let sortings = [];
          for (let sorting of filterSorting.Sortings) {
            let sortingObject: any = {};
            sortingObject.name = sorting.Name;
            sortingObject.icon = sorting.Icon;
            sortingObject.selected = false;
            sortingObject.key = sorting.Key;

            sortings.push(sortingObject);
          }
          headerObject.sortings = sortings;

          // Add filters
          let filters = [];
          for (let filter of filterSorting.Filters) {
            let filterObject: any = {};
            filterObject.name = filter.Name;
            filterObject.type = filter.Type;
            filterObject.filterUsed = false;

            // Add specific parameters for certain filters
            if ('Options' in filter) filterObject.Options = filter.Options;
            if ('DefaultSelected' in filter) filterObject.selected = filter.DefaultSelected;

            if (filter.Type == 'Slider') this.initSliderParameters(filterObject, i);
            if (filter.Type == 'Checkbox') this.initCheckboxParameters(i, filterObject);

            filters.push(filterObject);
          }
          headerObject.filters = filters;
        }
      }
      this.tableHeaderFormatted.push(headerObject);
    }
  }

  // Adjust the image depending on whether filter and/or sorting is displayed
  getArrowSrc(header: any): "arrow" | "arrowWithPoint" | "arrowWithSort" | "arrowWithPointAndSort" {
    let filterUsed = false;
    let sortingUsed = false;

    // Check which filters and sortings are selected
    if (header.filterUsed) filterUsed = true;

    for(let sorting of header.sortings) {
      if (sorting.selected) sortingUsed = true;
    }

    if(filterUsed && sortingUsed) return "arrowWithPointAndSort";
    if(filterUsed) return "arrowWithPoint";
    if(sortingUsed) return "arrowWithSort";

    return "arrow";
  }

  // Indicates whether any filters or sortings are applied to display the "Clear Changes" button
  clearChangesDisplayed(): boolean {
    let angezeigt = false;

    this.tableHeaderFormatted.forEach((h: any) => {
      h.sortings.forEach((s: any) => {
        if(s.selected || h.filterUsed) {
          angezeigt = true;
          return;
        }
      });
    });

    return angezeigt;
  }

  // Needed for the "Clear Changes" button
  clearChanges() {
    this.tableDataFormatted = [];
    this.tableHeaderFormatted = [];
    this.initialTableDataFormatted = [];
    this.initializeData();
  }

   // Needed for the dynamic generation of the popup in HTML
   getFilterSortPopupOptions(): any {
    for (let filterSorting of this.tableHeaderFormatted) {
      if (filterSorting == this.filterSortPopup) {
        this.selectedDropdownOption = filterSorting.filters[0].selected;
        return filterSorting;
      }
    }
  }

  // ------------------------
  // Futher helper methods
  // ------------------------

  private initCheckboxParameters(i: number, filterObject: any) {
    let Options = [];
    let uniqueValues = [...new Set(this.tableData.map(row => row[i]))];
    for (let value of uniqueValues) {
      Options.push({ name: value, selected: true });
    }
    filterObject.Options = Options;
  }

  private initSliderParameters(filterObject: any, i: number) {
    filterObject.min = Math.floor(Math.min(...this.tableData.map(row => row[i])));
    filterObject.value1 = filterObject.min;

    filterObject.max = Math.ceil(Math.max(...this.tableData.map(row => row[i])));
    filterObject.value2 = filterObject.max;

    if (filterObject.min == filterObject.max) {
      filterObject.type = "none";
    }
  }

  private filterTypeObjectAnwenden(filter: any, i: number, header: any) {
    this.tableDataFormatted.forEach((line: any) => {
      if (!(filter.Options.find((option: any) => option.selected && option.name == line.row[i].value))) {
        line.shown = false;
        header.filterUsed = true;
      }
    });
  }

  private filterTypeNumberUndDecimalAnwenden(i: number, filter: any, header: any) {
    this.tableDataFormatted.forEach((line: any) => {
      if (!(line.row[i].value >= filter.value1 && line.row[i].value <= filter.value2)) {
        line.shown = false;
        header.filterUsed = true;
      }
    });
  }

  private filterTypeTextAnwenden(filter: any, i: number, header: any) {
    this.tableDataFormatted.forEach((line: any) => {
      if (!filter.selected || !line.row[i].value) {
        line.row[i].highlightedRange = { start: -1, end: -1 };
      }
      else if (line.row[i].value.toLowerCase().includes(filter.selected.toLowerCase())) {
        line.row[i].highlightedRange = { start: line.row[i].value.toLowerCase().indexOf(filter.selected.toLowerCase()), end: line.row[i].value.toLowerCase().indexOf(filter.selected.toLowerCase()) + filter.selected.length };
      }
      else {
        line.shown = false;
        line.row[i].highlightedRange = { start: -1, end: -1 };
        header.filterUsed = true;
      }
    });
  }

  private filterTypeDateAnwenden(filter: any, header: any, i: number) {
    if (filter.selected == "Today") {
      header.filterUsed = this.filterToday(i) ?? true;
    }
    else if (filter.selected == "Yesterday") {
      header.filterUsed = this.filterYesterday(i) ?? true;
    }
    else if (filter.selected == "This week") {
      header.filterUsed = this.filterByWeek(i) ?? true;
    }
    else if (filter.selected == "This month") {
      header.filterUsed = this.filterByMonth(i) ?? true;
    }
    else if (filter.selected == "This year") {
      header.filterUsed = this.filterByYear(i) ?? true;
    }
  }

  private formatDate(date: string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${day}.${month}.${year}`;
  }

  private filterToday(lineNumber: number): boolean {
    let used = false;
    this.tableDataFormatted.forEach((line: any) => {
      if (line.row[lineNumber].value != this.formatDate(new Date().toISOString())) {
        line.shown = false;
        used = true;
      }
    });
    return used;
  }

  private filterYesterday(lineNumber: number): boolean {
    let used = false;
    this.tableDataFormatted.forEach((line: any) => {
      if (line.row[lineNumber].value != this.formatDate(new Date(new Date().setDate(new Date().getDate() - 1)).toISOString())) {
        line.shown = false;
        used = true;
      }
    });
    return used;
  }

  private filterByWeek(lineNumber: number): boolean {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    let used = false;

    const currentWeek = this.getWeek(new Date());
    this.tableDataFormatted.forEach((line: any) => {
      const date = this.parseDate(line.row[lineNumber].value);
      if (!(this.getWeek(date) === currentWeek && date.getFullYear() === currentYear && date.getMonth() === currentMonth)) {
        line.shown = false;
        used = true;
      }
    });
    return used;
  }

  private filterByYear(lineNumber: number): boolean {
    const currentYear = new Date().getFullYear();
    let used = false;
    this.tableDataFormatted.forEach((line: any) => {
      const date = this.parseDate(line.row[lineNumber].value);
      if (!(date.getFullYear() === currentYear)) {
        line.shown = false;
        used = true;
      }
    });
    return used;
  }

  private filterByMonth(lineNumber: number): boolean {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    let used = false;

    this.tableDataFormatted.forEach((line: any) => {
      const date = this.parseDate(line.row[lineNumber].value);
      if (!(date.getFullYear() === currentYear && date.getMonth() === currentMonth)) {
        line.shown = false;
        used = true;
      }
    });
    return used;
  }

  private parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('.').map(part => parseInt(part, 10));
    return new Date(year, month - 1, day);
  }

  private getWeek(date: Date): number {
    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7; // ISO week starts on Monday
    target.setDate(target.getDate() - dayNr + 3); // Thursday
    const firstThursday = new Date(target.getFullYear(), 0, 4);

    // Calculate the number of days between the target date and the first Thursday of the year
    const daysBetween = Math.floor((target.getTime() - firstThursday.getTime()) / 86400000);
    const weekNumber = Math.round((daysBetween + firstThursday.getDay() + 1) / 7);

    return weekNumber;
  }
}
