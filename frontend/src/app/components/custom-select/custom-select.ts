import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-select.html',
  styleUrls: ['./custom-select.css'],
})
export class CustomSelectComponent {
  options = input.required<Array<{ value: any; label: string }>>();
  value = input.required<any>();
  label = input<string>('');
  id = input<string>('');

  valueChange = output<any>();

  isOpen = signal(false);

  toggleOpen() {
    this.isOpen.set(!this.isOpen());
  }

  selectOption(option: any) {
    this.valueChange.emit(option.value);
    this.isOpen.set(false);
  }

  getSelectedLabel(): string {
    const selected = this.options().find(opt => opt.value === this.value());
    return selected ? selected.label : this.value();
  }
}
