import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.css'],
})
export class ContactFormComponent {
  isLoading = input<boolean>(false);

  formSubmit = output<any>();

  contactsForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl<string | null>(null, [Validators.email]),
    phone: new FormControl<string>('', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]),
    active: new FormControl<boolean>(true),
  });

  onFormSubmit() {
    if (this.contactsForm.invalid) {
      this.markAllFieldsTouched();
      return;
    }
    this.formSubmit.emit(this.contactsForm.value);
  }

  getFieldError(fieldName: string): string {
    const field = this.contactsForm.get(fieldName);
    if (field && field.errors && (field.touched || field.dirty)) {
      if (field.errors['required']) return `${this.capitalize(fieldName)} is required`;
      if (field.errors['email']) return 'Invalid email format';
      if (field.errors['minlength']) return `${this.capitalize(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['pattern']) return 'Invalid phone number. Use E.164 format (e.g., +12345678900)';
    }
    return '';
  }

  private markAllFieldsTouched() {
    Object.values(this.contactsForm.controls).forEach(control => control.markAsTouched());
  }

  private capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
