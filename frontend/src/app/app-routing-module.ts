import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { ErrorPageComponent } from './components/error-page/error-page';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: '404',
    component: ErrorPageComponent,
    data: { errorCode: 404, errorTitle: 'Page Not Found', errorMessage: 'The page you are looking for does not exist.' }
  },
  {
    path: '500',
    component: ErrorPageComponent,
    data: { errorCode: 500, errorTitle: 'Server Error', errorMessage: 'An unexpected server error occurred.' }
  },
  // Wildcard route for 404
  {
    path: '**',
    component: ErrorPageComponent,
    data: { errorCode: 404, errorTitle: 'Page Not Found', errorMessage: 'The page you are looking for does not exist.' }
  }
];
