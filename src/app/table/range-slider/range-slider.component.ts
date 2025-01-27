import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { themeColors } from './theme-colors';

@Component({
  selector: 'app-range-slider',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './range-slider.component.html',
  styleUrl: './range-slider.component.css'
})
export class RangeSliderComponent {
  // Enter values for the range sliders at the beginning
  @Input() min!: number;
  @Input() max!: number;
  @Input() step!: number;
  @Input() value1!: number;
  @Input() value2!: number;
  @Input() theme: 'light' | 'dark' | 'red' = 'light';

  // Notify other components when the values change
  @Output() value1Change = new EventEmitter<number>();
  @Output() value2Change = new EventEmitter<number>();

  // Needed for displaying the track
  trackLeft: string = '';
  trackWidth: string = '';

  themeColors = themeColors;

  ngOnInit() {
    this.updateTrackStyles();
  }

  // Round values and notify about changes
  onValue2Change() {
    this.value2 = parseFloat(this.value2.toFixed(2));
    this.value2Change.emit(this.value2);
    this.onValueChange();
  }

  onValue1Change() {
    this.value1 = parseFloat(this.value1.toFixed(2));
    this.value1Change.emit(this.value1);
    this.onValueChange();
  }

  // Swap values if value1 > value2
  onValueChange() {
    if (this.value1 > this.value2) {
      [this.value1, this.value2] = [this.value2, this.value1];
      this.value2Change.emit(this.value2);
      this.value1Change.emit(this.value1);
    }
    this.updateTrackStyles();
  }

  updateTrackStyles() {
    const left = ((this.value1 - this.min) / (this.max - this.min)) * 100;
    const right = ((this.value2 - this.min) / (this.max - this.min)) * 100;
    this.trackLeft = `calc(${left}% + 2px)`;
    this.trackWidth = `calc(${right - left}% - 4px)`;
  }
}
