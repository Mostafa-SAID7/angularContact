import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorBoundaryComponent } from './components/error-boundary/error-boundary';
import { ToastComponent } from './components/toast/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    TranslateModule,
    ErrorBoundaryComponent,
    ToastComponent,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent {}
