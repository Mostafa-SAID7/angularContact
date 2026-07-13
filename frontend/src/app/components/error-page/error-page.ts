import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './error-page.html',
  styleUrls: ['./error-page.css'],
})
export class ErrorPageComponent {
  errorCode = input<number>(404);
  errorTitle = input<string>('Page Not Found');
  errorMessage = input<string>('The page you are looking for does not exist.');
  showReturnHome = input<boolean>(true);

  goBack() {
    window.history.back();
  }
}
