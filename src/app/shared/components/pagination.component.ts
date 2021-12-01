import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'pagination',
  template: `
    <nav aria-label="...">
      <ul class="pagination justify-content-end mb-0">
        <li class="page-item" [class.disabled]="currentPage == 1">
          <a
            class="page-link"
            href="javascript:void(0)"
            (click)="previous()"
            tabindex="-1"
          >
            <span> &laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          [class.active]="currentPage == page"
          *ngFor="let page of pages"
          (click)="changePage(page)"
        >
          <a class="page-link" href="javascript:void(0)">{{ page }}</a>
        </li>
        <li class="page-item" [class.disabled]="currentPage == pages.length">
          <a class="page-link" (click)="next()" href="javascript:void(0)">
            <!-- <i class="fas fa-angle-right"></i> -->
            <span>&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  `,
})
export class PaginationComponent implements OnChanges {
  @Input('total-items') totalItems;
  @Input('page-size') pageSize = 10;
  @Output('page-changed') pageChanged = new EventEmitter();
  pages: any[];
  currentPage = 1;

  ngOnChanges() {
    this.currentPage = 1;

    var pagesCount = Math.ceil(this.totalItems / this.pageSize);
    this.pages = [];
    for (var i = 1; i <= pagesCount; i++) this.pages.push(i);

    console.log(this);
  }

  changePage(page) {
    this.currentPage = page;
    this.pageChanged.emit(page);
  }

  previous() {
    if (this.currentPage == 1) return;

    this.currentPage--;
    this.pageChanged.emit(this.currentPage);
  }

  next() {
    if (this.currentPage == this.pages.length) return;

    this.currentPage++;
    console.log('next', this);
    this.pageChanged.emit(this.currentPage);
  }
}
