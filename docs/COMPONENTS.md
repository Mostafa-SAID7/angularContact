# Components Guide

Complete reference for all Angular components in the project.

## Component List

1. **HeaderComponent** — App header with dark mode & language toggle
2. **ContactFormComponent** — Form to add new contacts
3. **ContactListComponent** — List with search, sort, pagination
4. **ContactCardComponent** — Individual contact display card
5. **PaginationComponent** — Page navigation
6. **CustomSelectComponent** — Custom styled dropdown
7. **ModalComponent** — Reusable modal dialog
8. **ContactDetailModalComponent** — View contact details
9. **MessagesComponent** — Success/error alerts
10. **ToastComponent** — Global toast notifications
11. **ErrorBoundaryComponent** — Error handling wrapper
12. **ErrorPageComponent** — 404/500 error pages

---

## HeaderComponent

**Path:** `src/app/components/header/`

**Purpose:** Top navigation bar with dark mode toggle and language switcher.

**Inputs:**
```typescript
@Input() darkMode: boolean;
@Input() currentLang: string;
```

**Outputs:**
```typescript
@Output() darkModeToggle = new EventEmitter<void>();
@Output() languageChange = new EventEmitter<string>();
```

**Features:**
- Logo and title
- Dark mode toggle with animation
- Language selector (EN / AR / ES)
- Responsive mobile menu (optional)

**Usage:**
```html
<app-header 
  [darkMode]="darkMode()"
  [currentLang]="currentLang()"
  (darkModeToggle)="toggleDarkMode()"
  (languageChange)="switchLanguage($event)">
</app-header>
```

---

## ContactFormComponent

**Path:** `src/app/components/contact-form/`

**Purpose:** Reactive form to add new contacts with validation.

**Inputs:**
```typescript
@Input() isLoading: boolean;
```

**Outputs:**
```typescript
@Output() formSubmit = new EventEmitter<Partial<Contact>>();
```

**Form Fields:**
- Name (required, min 2 chars)
- Email (optional, valid email)
- Phone (required, E.164 format)
- Active checkbox (optional, default true)

**Validation:**
- Real-time error messages
- Submit button disabled while loading
- Phone format indicator

**Usage:**
```html
<app-contact-form 
  [isLoading]="isLoading()"
  (formSubmit)="onFormSubmit($event)">
</app-contact-form>
```

---

## ContactListComponent

**Path:** `src/app/components/contact-list/`

**Purpose:** Display paginated, searchable, sortable list of contacts.

**Inputs:**
```typescript
@Input() contacts: Contact[];
@Input() currentPage: number;
@Input() itemsPerPage: number;
@Input() searchTerm: string;
@Input() sortField: 'name' | 'email' | 'phone';
@Input() sortDirection: 'asc' | 'desc';
@Input() isLoading: boolean;
@Input() skeletonItems: any[];
```

**Outputs:**
```typescript
@Output() searchChange = new EventEmitter<string>();
@Output() sortFieldChange = new EventEmitter<string>();
@Output() sortDirectionChange = new EventEmitter<string>();
@Output() itemsPerPageChange = new EventEmitter<number>();
@Output() pageChange = new EventEmitter<number>();
@Output() viewContact = new EventEmitter<Contact>();
@Output() deleteContact = new EventEmitter<string>();
```

**Features:**
- Search box
- Sort dropdown
- Per-page selector
- Pagination controls
- Loading skeletons
- No results state

---

## ContactCardComponent

**Path:** `src/app/components/contact-card/`

**Purpose:** Display individual contact with view/delete actions.

**Inputs:**
```typescript
@Input() contact: Contact;
@Input() isLoading: boolean;
```

**Outputs:**
```typescript
@Output() view = new EventEmitter<Contact>();
@Output() delete = new EventEmitter<string>();
```

**Features:**
- Contact details (name, email, phone)
- Active/inactive status badge
- View & delete buttons
- Hover effects
- Delete confirmation

---

## PaginationComponent

**Path:** `src/app/components/pagination/`

**Purpose:** Navigate between pages.

**Inputs:**
```typescript
@Input() currentPage: number;
@Input() itemsPerPage: number;
@Input() filteredCount: number;
```

**Outputs:**
```typescript
@Output() pageChange = new EventEmitter<number>();
```

**Features:**
- First / Previous / Next / Last buttons
- Page number buttons (range)
- Disabled states
- Current page indicator

---

## CustomSelectComponent

**Path:** `src/app/components/custom-select/`

**Purpose:** Fully styled custom select dropdown (no browser default).

**Inputs:**
```typescript
@Input() options: Array<{ value: any; label: string }>;
@Input() value: any;
@Input() label: string;
@Input() id: string;
```

**Outputs:**
```typescript
@Output() valueChange = new EventEmitter<any>();
```

**Features:**
- Custom styling (Tailwind)
- Animated dropdown
- Checkmark for selected option
- Click-outside closes
- Dark mode support
- Z-index managed properly

---

## ModalComponent

**Path:** `src/app/components/modal/`

**Purpose:** Reusable modal dialog with customizable title and buttons.

**Inputs:**
```typescript
@Input() isOpen: boolean;
@Input() title: string;
@Input() closeLabel: string = 'Cancel';
@Input() confirmLabel: string = 'Confirm';
@Input() isDanger: boolean = false;
@Input() showConfirm: boolean = true;
```

**Outputs:**
```typescript
@Output() close = new EventEmitter<void>();
@Output() confirm = new EventEmitter<void>();
```

**Features:**
- Backdrop overlay
- Animated entrance
- Customizable buttons
- Danger mode (red confirm button)
- Optional confirm button (for view-only modals)
- Escape key closes
- Click-outside closes

---

## ContactDetailModalComponent

**Path:** `src/app/components/contact-detail-modal/`

**Purpose:** Display full contact details in a modal.

**Inputs:**
```typescript
@Input() isOpen: boolean;
@Input() contact: Contact | null;
```

**Outputs:**
```typescript
@Output() close = new EventEmitter<void>();
```

**Features:**
- Contact name (title)
- Status badge (Active/Inactive)
- Email with mailto link
- Phone with tel link
- Close button only (no confirm)
- Colored cards for each field

---

## MessagesComponent

**Path:** `src/app/components/messages/`

**Purpose:** Display success/error alert messages.

**Inputs:**
```typescript
@Input() successMessage: string | null;
@Input() error: string | null;
```

**Features:**
- Success message (green)
- Error message (red)
- Auto-dismiss after timeout
- Animation effects
- Close button

---

## ToastComponent

**Path:** `src/app/components/toast/`

**Purpose:** Global toast notifications (bottom-right corner).

**Features:**
- Success toasts (green)
- Error toasts (red)
- Warning toasts (amber)
- Info toasts (blue)
- Auto-dismiss
- Manual close button
- Stacked display
- Animation

**Usage in parent:**
```typescript
constructor(private toastService: ToastService) {}

someMethod() {
  this.toastService.success('Operation successful');
  this.toastService.error('Something went wrong');
  this.toastService.warning('This is deprecated');
  this.toastService.info('FYI: Something happened');
}
```

---

## ErrorBoundaryComponent

**Path:** `src/app/components/error-boundary/`

**Purpose:** Catch and handle child component errors gracefully.

**Features:**
- Catches child component errors
- Displays error UI instead of blank page
- Refresh page button
- Error logging

**Usage:**
```html
<app-error-boundary>
  <!-- Your components here -->
</app-error-boundary>
```

---

## ErrorPageComponent

**Path:** `src/app/components/error-page/`

**Purpose:** Display 404 and 500 error pages.

**Inputs:**
```typescript
@Input() errorCode: number = 404;
@Input() errorTitle: string = 'Page Not Found';
@Input() errorMessage: string = 'The page you are looking for does not exist.';
@Input() showReturnHome: boolean = true;
```

**Features:**
- Animated error icon
- Error code display
- Return home button
- Go back button
- Contact support link

---

## Component Creation Guide

### Creating a new component

```bash
ng generate component components/my-component
```

### Component template

```html
<div class="component-container">
  <h1>{{ title() }}</h1>
  <p>{{ content }}</p>
</div>
```

### Component TypeScript

```typescript
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-component.html',
  styleUrls: ['./my-component.css'],
})
export class MyComponent {
  title = input<string>('Default Title');
  content = input<string>('');
  
  onAction = output<string>();
  
  handleClick(value: string) {
    this.onAction.emit(value);
  }
}
```

### Component CSS

Keep empty or add component-specific styles:

```css
/* my-component.css */
:host {
  display: block;
}
```

---

## Communication Patterns

### Parent → Child (Inputs)

```html
<app-child [data]="parentData()"></app-child>
```

### Child → Parent (Outputs)

```html
<button (click)="onAction.emit('data')"></button>
```

```typescript
@Component(...)
export class ChildComponent {
  onAction = output<string>();
}
```

### Two-way binding

```html
<app-custom-select 
  [value]="sortField()"
  (valueChange)="setSortField($event)">
</app-custom-select>
```

---

## Best Practices

1. **Use standalone components** — No NgModule overhead
2. **Use inputs() instead of @Input** — Modern signal syntax
3. **Use output() instead of @Output** — Modern signal syntax
4. **Keep components small** — <150 lines ideally
5. **Bind data via inputs** — Avoid direct service injection for display data
6. **Emit events via outputs** — Avoid calling parent methods directly
7. **Use trackBy in *ngFor** — Improves performance
8. **Use OnPush detection** — For components with signals
9. **DRY principle** — Extract common UI into reusable components
10. **Type everything** — Avoid `any` types

---

## Related Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — System design
- [API.md](./API.md) — Backend API reference
