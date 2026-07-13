import { Component, ErrorHandler, Injector, Injectable, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Custom error handler that catches uncaught errors
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private injector: Injector,
    private ngZone: NgZone
  ) {}

  handleError(error: any): void {
    const chunkFailedMessage = /Loading chunk \d+ failed/g;

    if (chunkFailedMessage.test(error.message)) {
      // Handle chunk loading errors (usually deployment updates)
      this.ngZone.run(() => {
        window.location.reload();
      });
    } else {
      // Log other errors
      console.error('Global Error Handler caught:', error);
    }
  }
}

/**
 * Error Boundary Component - Catches child component errors
 */
@Component({
  selector: 'app-error-boundary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="!hasError; else errorTemplate">
      <ng-content></ng-content>
    </ng-container>

    <ng-template #errorTemplate>
      <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <div class="text-center max-w-md w-full">
          <div class="mb-8">
            <svg class="w-20 h-20 mx-auto text-red-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4v2m0 0v2m0-6v-2m0 0V7a2 2 0 012-2h2.586a1 1 0 00-.707-1.707h-3.172a1 1 0 00-.707 1.707H12zm0 0V5m0 10v2m0 0v2m0-6v-2m0 0V7m0 10h0m4 0h0" />
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Something Went Wrong</h1>
          <p class="text-gray-600 dark:text-gray-400 mb-6">An unexpected error occurred. Please try refreshing the page.</p>
          <button
            (click)="resetError()"
            class="px-6 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
            Refresh Page
          </button>
        </div>
      </div>
    </ng-template>
  `,
})
export class ErrorBoundaryComponent {
  hasError = false;
  errorMessage: string | null = null;

  constructor(private injector: Injector) {
    this.setupErrorBoundary();
  }

  private setupErrorBoundary() {
    // Listen for component errors
    const ngZone = this.injector.get(NgZone);
    ngZone.onError.subscribe(error => {
      this.hasError = true;
      this.errorMessage = error?.message || 'Unknown error occurred';
      console.error('Error caught by boundary:', error);
    });
  }

  resetError() {
    this.hasError = false;
    this.errorMessage = null;
    window.location.reload();
  }
}
