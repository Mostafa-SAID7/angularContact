// src/app/app.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { catchError, finalize, of } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export interface Contact {
  id: number;
  name: string;
  email?: string | null;
  phone: string;
  isActive: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  http = inject(HttpClient);

  // signals
  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(5);
  searchTerm = signal<string>('');
  sortField = signal<keyof Contact>('name');
  sortDirection = signal<'asc' | 'desc'>('asc');
  darkMode = signal<boolean>(localStorage.getItem('darkMode') === 'true');
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  contacts = signal<Contact[]>([]);
  skeletonItems = Array.from({ length: 4 });

  // form
  contactsForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl<string | null>(null, [Validators.email]),
    phone: new FormControl<string>('', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]),
    active: new FormControl<boolean>(true)
  });

  constructor(private translate: TranslateService) {
    // default lang
    this.translate.setDefaultLang('en');

    const storedLang = localStorage.getItem('lang');
    if (storedLang) {
      this.switchLanguage(storedLang);
    }

    this.fetchContacts();
  }
  get currentLang(): string {
    // prefer TranslateService.currentLang, fall back to stored value or 'en'
    return (this.translate.currentLang || localStorage.getItem('lang') || 'en') as string;
  }
  
  isActiveLang(lang: string): boolean {
    return this.currentLang === lang;
  }
  // --- i18n
  switchLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  // --- UI
  toggleDarkMode() {
    this.darkMode.set(!this.darkMode());
    localStorage.setItem('darkMode', this.darkMode() ? 'true' : 'false');
  }

  // --- Fetch
  fetchContacts() {
    this.isLoading.set(true);
    this.error.set(null);

    this.http.get<Contact[]>('https://localhost:5001/api/Contacts')
      .pipe(
        catchError((err) => {
          console.error(err);
          this.error.set(this.translate.instant('ERRORS.LOAD_CONTACTS'));
          return of([] as Contact[]);
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe((res) => this.contacts.set(res || []));
  }

  // --- Sorting & Filtering
  setSortField(field: string) {
    this.sortField.set(field as keyof Contact);
  }

  private getFilteredSortedList(): Contact[] {
    const term = this.searchTerm().toLowerCase().trim();
    let list = this.contacts().filter(c =>
      c.name.toLowerCase().includes(term) ||
      (c.email?.toLowerCase().includes(term)) ||
      c.phone.includes(term)
    );

    const field = this.sortField();
    const direction = this.sortDirection();
    list = list.sort((a, b) => {
      const aVal = ((a[field] ?? '') as any).toString().toLowerCase();
      const bVal = ((b[field] ?? '') as any).toString().toLowerCase();
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    return list;
  }

  get filteredContacts(): Contact[] {
    const list = this.getFilteredSortedList();
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    const end = start + this.itemsPerPage();
    return list.slice(start, end);
  }

  get filteredCount(): number {
    return this.getFilteredSortedList().length;
  }

  totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredCount / this.itemsPerPage()));
  }

  pages(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    const p = Math.min(Math.max(1, page), this.totalPages());
    this.currentPage.set(p);
  }

  prevPage() {
    if (this.currentPage() > 1) this.currentPage.set(this.currentPage() - 1);
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) this.currentPage.set(this.currentPage() + 1);
  }

  onSearch(value: string) {
    this.searchTerm.set(value);
    this.currentPage.set(1);
  }

  onItemsPerPageChange(value: any) {
    const n = Number(value) || 5;
    this.itemsPerPage.set(n);
    this.currentPage.set(1);
  }

  get endContactIndex(): number {
    const end = this.currentPage() * this.itemsPerPage();
    return Math.min(end, this.filteredCount);
  }

  toggleSortDirection() {
    this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
  }

  // --- Form & CRUD
  onFormSubmit() {
    if (this.contactsForm.invalid) {
      this.error.set(this.translate.instant('ERRORS.INVALID_FORM'));
      this.markAllFieldsTouched();
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    const payload = {
      name: this.contactsForm.value.name,
      phone: this.contactsForm.value.phone,
      email: this.contactsForm.value.email,
      isActive: this.contactsForm.value.active
    };

    this.http.post('https://localhost:5001/api/Contacts', payload)
      .pipe(
        catchError((err) => {
          console.error(err);
          this.error.set(this.translate.instant('ERRORS.ADD_CONTACT'));
          return of(null);
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe((res) => {
        if (res) {
          this.successMessage.set(this.translate.instant('MESSAGES.ADDED_SUCCESS'));
          this.contactsForm.reset({ active: true });
          this.fetchContacts();
          this.currentPage.set(1);
          setTimeout(() => this.successMessage.set(null), 3000);
        }
      });
  }

  onDelete(id: number) {
    const confirmed = confirm(this.translate.instant('CONFIRM.DELETE'));
    if (!confirmed) return;

    this.isLoading.set(true);
    this.error.set(null);

    this.http.delete(`https://localhost:5001/api/Contacts/${id}`)
      .pipe(
        catchError((err) => {
          console.error(err);
          this.error.set(this.translate.instant('ERRORS.DELETE_CONTACT'));
          return of(null);
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe((res) => {
        if (res !== null) {
          this.successMessage.set(this.translate.instant('MESSAGES.DELETED_SUCCESS'));
          this.fetchContacts();
          setTimeout(() => {
            if (this.currentPage() > this.totalPages()) this.currentPage.set(this.totalPages());
            this.successMessage.set(null);
          }, 3000);
        }
      });
  }

  viewContact(contact: Contact) {
    alert(this.translate.instant('MESSAGES.VIEW_CONTACT', {
      name: contact.name,
      phone: contact.phone,
      email: contact.email ?? ''
    }));
  }

  // --- helpers
  getFieldError(fieldName: string): string {
    const field = this.contactsForm.get(fieldName);
    if (field && field.errors && (field.touched || field.dirty)) {
      if (field.errors['required']) return this.translate.instant('ERRORS.REQUIRED', { field: this.capitalize(fieldName) });
      if (field.errors['email']) return this.translate.instant('ERRORS.EMAIL');
      if (field.errors['minlength']) return this.translate.instant('ERRORS.MIN_LENGTH', { field: this.capitalize(fieldName), length: field.errors['minlength'].requiredLength });
      if (field.errors['pattern']) return this.translate.instant('ERRORS.PHONE');
    }
    return '';
  }

  private markAllFieldsTouched() {
    Object.values(this.contactsForm.controls).forEach(control => control.markAsTouched());
  }

  private capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  trackById(_: number, item: Contact) { return item.id; }
}
