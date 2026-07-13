import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, finalize } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from '../../components/header/header';
import { MessagesComponent } from '../../components/messages/messages';
import { ContactFormComponent } from '../../components/contact-form/contact-form';
import { ContactListComponent } from '../../components/contact-list/contact-list';
import { ModalComponent } from '../../components/modal/modal';
import { ContactDetailModalComponent } from '../../components/contact-detail-modal/contact-detail-modal';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    HeaderComponent,
    MessagesComponent,
    ContactFormComponent,
    ContactListComponent,
    ModalComponent,
    ContactDetailModalComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements OnInit {
  private contactService = inject(ContactService);
  private translate = inject(TranslateService);

  // State signals
  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(5);
  searchTerm = signal<string>('');
  sortField = signal<'name' | 'email' | 'phone'>('name');
  sortDirection = signal<'asc' | 'desc'>('asc');
  darkMode = signal<boolean>(localStorage.getItem('darkMode') === 'true');
  currentLang = signal<string>(localStorage.getItem('lang') || 'en');
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  contacts = signal<Contact[]>([]);
  skeletonItems = Array.from({ length: 4 });

  // Modal states
  showDeleteConfirm = signal<boolean>(false);
  deleteContactId = signal<string | null>(null);
  showDetailModal = signal<boolean>(false);
  selectedContact = signal<Contact | null>(null);

  ngOnInit() {
    this.loadContacts();
    this.setupTranslations();
    this.applyDarkMode();
  }

  private setupTranslations() {
    this.translate.setDefaultLang('en');
    this.translate.use(this.currentLang());
  }

  private applyDarkMode() {
    const html = document.documentElement;
    if (this.darkMode()) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }

  loadContacts() {
    this.isLoading.set(true);
    this.error.set(null);

    this.contactService
      .getContacts()
      .pipe(
        catchError(() => {
          this.error.set('Failed to load contacts. Please try again.');
          return [];
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe(contacts => {
        this.contacts.set(contacts);
      });
  }

  onFormSubmit(formData: any) {
    if (!formData || !formData.name || !formData.phone) {
      this.error.set('Name and phone are required');
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    const contact = {
      name: formData.name.trim(),
      email: formData.email ? formData.email.trim() : null,
      phone: formData.phone.trim(),
      isActive: formData.active ?? true,
    };

    this.contactService
      .createContact(contact)
      .pipe(
        catchError(() => {
          this.error.set('Failed to add contact. Please try again.');
          return [];
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe(() => {
        this.successMessage.set('Contact added successfully');
        setTimeout(() => this.successMessage.set(null), 3000);
        this.loadContacts();
      });
  }

  onDeleteContact(id: string) {
    this.deleteContactId.set(id);
    this.showDeleteConfirm.set(true);
  }

  confirmDelete() {
    const id = this.deleteContactId();
    if (!id) return;

    this.isLoading.set(true);
    this.error.set(null);

    this.contactService
      .deleteContact(id)
      .pipe(
        catchError(() => {
          this.error.set('Failed to delete contact. Please try again.');
          return [];
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe(() => {
        this.successMessage.set('Contact deleted successfully');
        setTimeout(() => this.successMessage.set(null), 3000);
        this.showDeleteConfirm.set(false);
        this.deleteContactId.set(null);
        this.loadContacts();
      });
  }

  closeDeleteConfirm() {
    this.showDeleteConfirm.set(false);
    this.deleteContactId.set(null);
  }

  onViewContact(contact: Contact) {
    this.selectedContact.set(contact);
    this.showDetailModal.set(true);
  }

  closeDetailModal() {
    this.showDetailModal.set(false);
    this.selectedContact.set(null);
  }

  onSearch(term: string) {
    this.searchTerm.set(term);
    this.currentPage.set(1);
  }

  setSortField(field: 'name' | 'email' | 'phone') {
    this.sortField.set(field);
  }

  toggleSortDirection() {
    this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
  }

  onItemsPerPageChange(value: number) {
    this.itemsPerPage.set(value);
    this.currentPage.set(1);
  }

  goToPage(page: number) {
    this.currentPage.set(page);
  }

  toggleDarkMode() {
    const newDarkMode = !this.darkMode();
    this.darkMode.set(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    this.applyDarkMode();
  }

  switchLanguage(lang: string) {
    this.currentLang.set(lang);
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
  }
}
