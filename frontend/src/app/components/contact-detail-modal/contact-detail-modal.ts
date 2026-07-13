import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ModalComponent } from '../modal/modal';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-detail-modal',
  standalone: true,
  imports: [CommonModule, TranslateModule, ModalComponent],
  templateUrl: './contact-detail-modal.html',
  styleUrls: ['./contact-detail-modal.css'],
})
export class ContactDetailModalComponent {
  isOpen = input<boolean>(false);
  contact = input<Contact | null>(null);

  close = output<void>();

  onClose() {
    this.close.emit();
  }
}
