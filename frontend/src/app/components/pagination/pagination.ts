import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.css'],
})
export class PaginationComponent {
  currentPage = input<number>(1);
  itemsPerPage = input<number>(5);
  filteredCount = input<number>(0);

  pageChange = output<number>();

  totalPages = computed(() => Math.ceil(this.filteredCount() / this.itemsPerPage()));
  
  endContactIndex = computed(() => {
    const end = this.currentPage() * this.itemsPerPage();
    return Math.min(end, this.filteredCount());
  });

  pages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const delta = 2;
    const range = [];
    const rangeStart = Math.max(1, current - delta);
    const rangeEnd = Math.min(total, current + delta);

    for (let i = rangeStart; i <= rangeEnd; i++) {
      range.push(i);
    }

    return range;
  });

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.pageChange.emit(page);
    }
  }

  prevPage() {
    this.goToPage(this.currentPage() - 1);
  }

  nextPage() {
    this.goToPage(this.currentPage() + 1);
  }
}
