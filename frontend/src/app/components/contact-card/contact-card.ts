import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './contact-card.html',
  styleUrls: ['./contact-card.css'],
})
export class ContactCardComponent {
  contact = input.required<Contact>();
  isLoading = input<boolean>(false);

  view = output<Contact>();
  delete = output<string>();

  onView() {
    this.view.emit(this.contact());
  }

  onDelete() {
    this.delete.emit(this.contact().id);
  }
}
