import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/Contacts`;

  // Get all contacts
  getContacts() {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  // Create contact
  createContact(contact: Omit<Contact, 'id'>) {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  // Delete contact
  deleteContact(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
