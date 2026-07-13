// src/main.ts (use this factory)
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppComponent } from './app/app';

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  // Absolute path works for dev server and production if assets are in /assets
  return {
    getTranslation: (lang: string): Observable<any> => {
      // use leading slash; if your app is hosted under a subpath, change accordingly
      return http.get(`/assets/i18n/${lang}.json`);
    }
  } as TranslateLoader;
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter([]),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    )
  ]
}).catch(err => console.error(err));
