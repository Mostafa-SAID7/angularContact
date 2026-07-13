import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrls: ['./toast.css'],
})
export class ToastComponent {
  toastService = inject(ToastService);

  getIcon(type: string) {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'exclamation-circle';
      case 'warning':
        return 'exclamation-triangle';
      case 'info':
      default:
        return 'info-circle';
    }
  }

  getColor(type: string) {
    switch (type) {
      case 'success':
        return 'green';
      case 'error':
        return 'red';
      case 'warning':
        return 'amber';
      case 'info':
      default:
        return 'blue';
    }
  }

  removeToast(id: string) {
    this.toastService.remove(id);
  }
}
