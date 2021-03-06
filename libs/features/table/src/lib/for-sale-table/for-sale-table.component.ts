import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { BehaviorSubject, interval, Observable, Subject } from 'rxjs';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { debounceTime, delay, filter, map, take, takeUntil, tap } from 'rxjs/operators';
import {ForSaleDataSource} from './for-sale-table-datasource';
import {MatSort, Sort} from '@angular/material/sort';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {selectQueryParams} from '@best-practice/common/router';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Server, serverActions, serverSelectors } from '@best-practice/common/server-store';

@Component({
  selector: 'app-for-sale-table',
  templateUrl: './for-sale-table.component.html',
  styleUrls: ['./for-sale-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForSaleTableComponent implements OnInit, OnDestroy, AfterViewInit {
  destroy$: Subject<void>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: ForSaleDataSource;
  page$: Subject<PageEvent>;
  sort$: Subject<Sort>;
  cachedData$: Observable<any>;

  search$: Subject<string>;

  readonly form: FormGroup;

  public readonly queryParams$: Observable<Params>;
  public readonly currentServer$: Observable<Server>;

  constructor(private readonly fb: FormBuilder,
              private readonly store: Store,
              private readonly router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
  ) {
    this.destroy$ = new Subject<void>();
    this.page$ = new Subject<PageEvent>();
    this.sort$ = new BehaviorSubject<Sort>({active: 'position', direction: 'asc'});
    this.search$ = new BehaviorSubject<string>('');
    this.cachedData$ = this.store.select(serverSelectors.selectCurrentServerForSale).pipe(
      map(filteredItems => {
        return {
          data: filteredItems,
          count: filteredItems.length
        };
      }),
    );
    this.dataSource = new ForSaleDataSource(this.page$, this.sort$, this.search$, this.http, this.cachedData$);
    this.form = this.fb.group({search: ''});

    this.queryParams$ = store.select(selectQueryParams);
    this.currentServer$ = this.store.select(serverSelectors.selectCurrentServer).pipe(filter(server => server !== undefined));

  }


  ngOnInit(): void {

    this.currentServer$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((server) => {
      this.store.dispatch(serverActions.forsale({id: server.id}));
    });
  }

  handlePagination(): void {
    this.paginator.page.asObservable().pipe(takeUntil(this.destroy$), delay(0)).subscribe(evt => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          page: evt.pageIndex,
          pagesize: evt.pageSize
        },
        queryParamsHandling: 'merge'
      });
      this.page$.next(evt);
    });

    // check for if new search result makes your current page nonexistent
    this.dataSource.count$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(( count) => {
      console.log(this.paginator.pageIndex * this.paginator.pageSize);
      console.log(count);
      if (this.paginator.pageIndex * this.paginator.pageSize > count) {
        this.paginator.firstPage();
      }
    });
  }

  handleSorting(): void {
    this.sort.sortChange.asObservable().pipe(takeUntil(this.destroy$), delay(0)).subscribe(evt => {
      this.sort$.next(evt);
    });
  }

  handleSearching(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$), debounceTime(300)).subscribe((val) => {
      // this.paginator.firstPage();
      this.search$.next(val.search);
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          search: val.search || undefined
        },
        queryParamsHandling: 'merge'
      });
    });
  }

  initializeFromQueryParams(): void {
    this.queryParams$.pipe(take(1), delay(0)).subscribe(params => {
      if (params.search) {
        this.form.get('search').patchValue(params.search);
        this.search$.next(params.search);
      }
      if (params.pagesize && params.page) {
        this.page$.next({pageSize: params.pagesize, pageIndex: params.page, length: 0});
      }else {
        this.page$.next({pageSize: 20, pageIndex: 0, length: 0});
      }
    });
  }

  mapChildLocations(consolidated): any
  {
    return consolidated.children.map((child) => {
      return `${child.storageName} Floor ${child.storageFloor}: (${child.quantity})`;
    }).join(' --- ');
  }

  // we do not have access to the paginator and sort until ViewInit, so we set that up in here
  ngAfterViewInit(): void {
    this.handlePagination();
    this.handleSorting();
    this.handleSearching();
    this.initializeFromQueryParams();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
