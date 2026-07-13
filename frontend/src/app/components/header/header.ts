import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent {
  private translate = inject(TranslateService);

  darkMode = input<boolean>(false);
  currentLang = input<string>('en');

  darkModeToggle = output<void>();
  languageChange = output<string>();

  toggleDarkMode() {
    this.darkModeToggle.emit();
  }

  switchLanguage(lang: string) {
    this.languageChange.emit(lang);
  }

  isActiveLang(lang: string): boolean {
    return this.currentLang() === lang;
  }
}
