import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrls: ['./modal.css'],
})
export class ModalComponent {
  isOpen = input<boolean>(false);
  title = input<string>('');
  closeLabel = input<string>('Cancel');
  confirmLabel = input<string>('Confirm');
  isDanger = input<boolean>(false);
  showConfirm = input<boolean>(true);

  close = output<void>();
  confirm = output<void>();

  onClose() {
    this.close.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }

  onBackdropClick() {
    this.close.emit();
  }
}
