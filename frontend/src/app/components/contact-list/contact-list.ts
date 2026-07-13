import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ContactCardComponent } from '../contact-card/contact-card';
import { PaginationComponent } from '../pagination/pagination';
import { CustomSelectComponent } from '../custom-select/custom-select';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, ContactCardComponent, PaginationComponent, CustomSelectComponent],
  templateUrl: './contact-list.html',
  styleUrls: ['./contact-list.css'],
})
export class ContactListComponent {
  contacts = input<Contact[]>([]);
  currentPage = input<number>(1);
  itemsPerPage = input<number>(5);
  searchTerm = input<string>('');
  sortField = input<'name' | 'email' | 'phone'>('name');
  sortDirection = input<'asc' | 'desc'>('asc');
  isLoading = input<boolean>(false);
  skeletonItems = input<any[]>(Array.from({ length: 4 }));

  searchChange = output<string>();
  sortFieldChange = output<'name' | 'email' | 'phone'>();
  sortDirectionChange = output<'asc' | 'desc'>();
  itemsPerPageChange = output<number>();
  pageChange = output<number>();
  viewContact = output<Contact>();
  deleteContact = output<string>();

  filteredContacts = computed(() => {
    let filtered = this.contacts();

    // Filter by search term
    if (this.searchTerm()) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
        (c.email && c.email.toLowerCase().includes(this.searchTerm().toLowerCase())) ||
        c.phone.includes(this.searchTerm())
      );
    }

    // Sort
    const field = this.sortField();
    const direction = this.sortDirection();
    filtered.sort((a, b) => {
      let aVal: string | boolean = field === 'email' ? (a.email || '') : field === 'phone' ? a.phone : a.name;
      let bVal: string | boolean = field === 'email' ? (b.email || '') : field === 'phone' ? b.phone : b.name;

      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();

      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return direction === 'asc' ? comparison : -comparison;
    });

    // Paginate
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    return filtered.slice(start, start + this.itemsPerPage());
  });

  filteredCount = computed(() => {
    let filtered = this.contacts();
    if (this.searchTerm()) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
        (c.email && c.email.toLowerCase().includes(this.searchTerm().toLowerCase())) ||
        c.phone.includes(this.searchTerm())
      );
    }
    return filtered.length;
  });

  onSearch(term: string) {
    this.searchChange.emit(term);
  }

  setSortField(field: 'name' | 'email' | 'phone') {
    this.sortFieldChange.emit(field);
  }

  toggleSortDirection() {
    this.sortDirectionChange.emit(this.sortDirection() === 'asc' ? 'desc' : 'asc');
  }

  onItemsPerPageChange(value: number) {
    this.itemsPerPageChange.emit(value);
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }

  onViewContact(contact: Contact) {
    this.viewContact.emit(contact);
  }

  onDeleteContact(id: string) {
    this.deleteContact.emit(id);
  }

  trackById(index: number, contact: Contact): string {
    return contact.id;
  }
}
