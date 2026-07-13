import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { catchError, finalize } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header';
import { MessagesComponent } from './components/messages/messages';
import { ContactFormComponent } from './components/contact-form/contact-form';
import { ContactListComponent } from './components/contact-list/contact-list';
import { ContactService } from './services/contact.service';
import { Contact } from './models/contact.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    HeaderComponent,
    MessagesComponent,
    ContactFormComponent,
    ContactListComponent,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent implements OnInit {
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
    if (!confirm('Are you sure you want to delete this contact?')) return;

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
        this.loadContacts();
      });
  }

  onViewContact(contact: Contact) {
    console.log('Viewing contact:', contact);
    // Future: could open a detail modal or navigate to detail page
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
