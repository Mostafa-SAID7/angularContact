import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, finalize, of } from 'rxjs';

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
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div [class.dark]="darkMode()" class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
    <div class="max-w-7xl mx-auto p-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <!-- Left: Form (sticky on lg) -->
        <aside class="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:overflow-auto">
          <h1 class="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-4">Contact Manager</h1>

          <!-- Live messages -->
          <div class="space-y-2 mb-4" aria-live="polite">
            <div *ngIf="successMessage()" class="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 rounded-lg shadow-sm">{{ successMessage() }}</div>
            <div *ngIf="error()" class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 rounded-lg shadow-sm">{{ error() }}</div>
          </div>

          <!-- Form -->
          <form [formGroup]="contactsForm" (ngSubmit)="onFormSubmit()" class="space-y-4">

            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-600 dark:text-gray-300">Name *</label>
              <input id="name" type="text" formControlName="name" [attr.aria-invalid]="!!getFieldError('name')" class="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm bg-white dark:bg-gray-700" />
              <p *ngIf="getFieldError('name')" class="mt-1 text-sm text-red-600">{{ getFieldError('name') }}</p>
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-600 dark:text-gray-300">Email</label>
              <input id="email" type="email" formControlName="email" [attr.aria-invalid]="!!getFieldError('email')" class="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm bg-white dark:bg-gray-700" />
              <p *ngIf="getFieldError('email')" class="mt-1 text-sm text-red-600">{{ getFieldError('email') }}</p>
            </div>

            <!-- Phone -->
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-600 dark:text-gray-300">Phone *</label>
              <input id="phone" type="tel" formControlName="phone" [attr.aria-invalid]="!!getFieldError('phone')" class="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm bg-white dark:bg-gray-700" />
              <p *ngIf="getFieldError('phone')" class="mt-1 text-sm text-red-600">{{ getFieldError('phone') }}</p>
            </div>

            <!-- Active -->
            <div class="flex items-center gap-2">
              <input id="active" type="checkbox" formControlName="active" class="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500" />
              <label for="active" class="text-sm font-medium text-gray-600 dark:text-gray-300">Active</label>
            </div>

            <!-- Submit -->
            <button type="submit" [disabled]="isLoading() || contactsForm.invalid" class="w-full inline-flex justify-center items-center gap-2 py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed bg-indigo-600 hover:bg-indigo-700 text-white">
              <svg *ngIf="isLoading()" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span *ngIf="isLoading()">Working...</span>
              <span *ngIf="!isLoading()">Add contact</span>
            </button>

          </form>

        </aside>

        <!-- Right: Contacts list -->
        <main class="flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold">Contacts</h2>

            <div class="flex items-center gap-2">
              <button (click)="toggleDarkMode()" class="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                <span *ngIf="darkMode()">🌙 Dark</span>
                <span *ngIf="!darkMode()">☀️ Light</span>
              </button>
            </div>
          </div>

          <!-- Loading / Skeleton -->
          <div *ngIf="isLoading() && contacts().length === 0" class="space-y-3">
            <div *ngFor="let _ of skeletonItems" class="h-20 bg-white dark:bg-gray-800 rounded-xl shadow animate-pulse"></div>
          </div>

          <!-- Contacts -->
          <ul *ngIf="contacts().length > 0; else emptyState" class="grid gap-4">
            <li *ngFor="let contact of contacts(); trackBy: trackById" class="bg-white dark:bg-gray-800 shadow rounded-xl p-4 flex justify-between items-start border-l-4" [ngClass]="{'border-green-400': contact.isActive, 'border-gray-200 dark:border-gray-700': !contact.isActive}">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-lg font-bold">{{ contact.name }}</h3>
                  <span *ngIf="contact.isActive" class="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">Active</span>
                  <span *ngIf="!contact.isActive" class="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 rounded-full">Inactive</span>
                </div>

                <div class="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <a *ngIf="contact.email" [href]="'mailto:' + contact.email" class="flex items-center gap-2 hover:text-indigo-600 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" /><path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" /></svg>
                    <span>{{ contact.email }}</span>
                  </a>

                  <a [href]="'tel:' + contact.phone" class="flex items-center gap-2 hover:text-green-600 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clip-rule="evenodd" /></svg>
                    <span>{{ contact.phone }}</span>
                  </a>
                </div>
              </div>

              <div class="flex flex-col gap-2 ml-4 self-start">
                <button (click)="viewContact(contact)" class="px-3 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">View</button>
                <button (click)="onDelete(contact.id)" [disabled]="isLoading()" class="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50">Delete</button>
              </div>
            </li>
          </ul>

          <!-- Empty state -->
          <ng-template #emptyState>
            <div class="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No contacts</h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">Get started by adding a new contact.</p>
            </div>
          </ng-template>

        </main>

      </div>
    </div>
  </div>
  `
})
export class AppComponent {
  http = inject(HttpClient);

  // UI state
  darkMode = signal<boolean>(localStorage.getItem('darkMode') === 'true');
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  // Contacts data as a signal
  contacts = signal<Contact[]>([]);
  skeletonItems = Array.from({ length: 4 });

  // Form
  contactsForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl<string | null>(null, [Validators.email]),
    phone: new FormControl<string>('', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]),
    active: new FormControl<boolean>(true)
  });

  constructor() {
    this.fetchContacts();
  }

  toggleDarkMode() {
    this.darkMode.set(!this.darkMode());
    localStorage.setItem('darkMode', this.darkMode() ? 'true' : 'false');
  }

  // Fetch contacts and update signal
  fetchContacts() {
    this.isLoading.set(true);
    this.error.set(null);

    this.http.get<Contact[]>('https://localhost:5001/api/Contacts')
      .pipe(
        catchError((err) => {
          console.error(err);
          this.error.set('Failed to load contacts. Please try again.');
          return of([] as Contact[]);
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe((res) => this.contacts.set(res || []));
  }

  onFormSubmit() {
    if (this.contactsForm.invalid) {
      this.error.set('Please fill in all required fields correctly.');
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
          this.error.set('Failed to add contact. Please try again.');
          return of(null);
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe((res) => {
        if (res) {
          this.successMessage.set('Contact added successfully!');
          this.contactsForm.reset({ active: true });
          this.fetchContacts();
          setTimeout(() => this.successMessage.set(null), 3000);
        }
      });
  }

  onDelete(id: number) {
    const confirmed = confirm('Are you sure you want to delete this contact?');
    if (!confirmed) return;

    this.isLoading.set(true);
    this.error.set(null);

    this.http.delete(`https://localhost:5001/api/Contacts/${id}`)
      .pipe(
        catchError((err) => {
          console.error(err);
          this.error.set('Failed to delete contact. Please try again.');
          return of(null);
        }),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe((res) => {
        // on success most backends return 204 or the deleted entity; just refresh
        if (res !== null) {
          this.successMessage.set('Contact deleted successfully!');
          this.fetchContacts();
          setTimeout(() => this.successMessage.set(null), 3000);
        }
      });
  }

  viewContact(contact: Contact) {
    // Placeholder for future expansion (drawer/modal)
    alert(`Viewing ${contact.name}\nPhone: ${contact.phone}${contact.email ? '\nEmail: ' + contact.email : ''}`);
  }

  // Helpers
  getFieldError(fieldName: string): string {
    const field = this.contactsForm.get(fieldName);
    if (field && field.errors && (field.touched || field.dirty)) {
      if (field.errors['required']) return `${this.capitalize(fieldName)} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['minlength']) return `${this.capitalize(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['pattern']) return 'Please enter a valid phone number (E.164)';
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
