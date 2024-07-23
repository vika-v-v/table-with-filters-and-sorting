import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { themeColors } from './theme-colors';

@Component({
  selector: 'app-custom-dropdown',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './custom-dropdown.component.html',
  styleUrl: './custom-dropdown.component.css'
})
export class CustomDropdownComponent {
  @Input() options: string[] = [];

  // Displayed option will not change - useful for action dropdowns like menu selection with fixed name
  @Input() alwaysSelectOption: string | null = null;

  @Input() selectedOption: string | null = null;
  @Input() theme: 'light' | 'dark' = 'light';

  @Output() selectionChange: EventEmitter<string> = new EventEmitter<string>(); // Notifies about selection changes

  dropdownOpen: boolean = false;

  // Options can be displayed either above or below; this variable determines the direction
  upwards: boolean = false;

  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('optionsContainer') optionsContainer!: ElementRef;

  themeColors = themeColors;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initializeDropdown();
  }

  ngAfterViewInit() {
    this.setPosition();
  }

  // Here, selectedOption is initialized based on input parameters
  private initializeDropdown() {
    if (this.alwaysSelectOption != null) {
      this.selectedOption = this.alwaysSelectOption;
    }
    else if (this.selectedOption == null) {
      this.selectedOption = "Wählen Sie eine Option aus...";
    }
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
    if (this.dropdownOpen) {
      setTimeout(() => this.setPosition(), 10);
    }
  }

  // Selected option should change
  selectOption(option: string): void {
    if (this.alwaysSelectOption == null) {
      this.selectedOption = option;
    }
    else {
      this.selectedOption = this.alwaysSelectOption;
    }

    this.selectionChange.emit(option);
    this.dropdownOpen = false;
  }

  // Determines whether the dropdown opens upwards or downwards
  private setPosition(): void {
    const dropdownRect = this.dropdown.nativeElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - dropdownRect.bottom;

    // Temporarily render the options container to measure its height
    this.upwards = false;
    this.cdr.detectChanges();

    const optionsRect = this.optionsContainer.nativeElement.getBoundingClientRect();
    const optionsHeight = optionsRect.height;

    this.upwards = spaceBelow < optionsHeight;

    this.cdr.detectChanges();
  }

  // Collapse dropdown when clicking outside the dropdown
  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    const targetElement = event.target as HTMLElement;

    if (this.dropdown) {
      if (!this.dropdown.nativeElement.contains(targetElement)) {
        this.dropdownOpen = false;
      }
    }
  }

  // Update dropdown position when window size changes
  @HostListener('window:resize')
  onResize(): void {
    if (this.dropdownOpen) {
      this.setPosition();
    }
  }
}
