import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import { delay, filter, map, shareReplay, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import {Sort} from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { SaleItem } from '@best-practice/common/server-store';

export class ForSaleDataSource implements DataSource<SaleItem> {

  private readonly data$: Observable<ForSaleResult>;
  public readonly count$: Observable<number>;
  public readonly loading$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly page$: Observable<PageEvent>,
              private readonly sort$: Observable<Sort>,
              private readonly search$: Observable<string>,
              private readonly http: HttpClient,
              private readonly cachedData$: Observable<any>)
  {
    // simulate search delay. switchMap makes sure previous observables are canceled if new ones come in.
    this.data$ = combineLatest(this.page$, this.sort$, this.search$, this.cachedData$)
      .pipe(
        tap(_ => this.loading$.next(true)),
        switchMap(([ page, sort, search, data]) => of({ page, sort, search, data}).pipe()),
        map((obj) => this.getFilteredElements(0, 0, undefined, obj.search, obj.data)),
        tap(_ => this.loading$.next(false)),
      );

    this.count$ = this.data$.pipe( map(data => data.count), startWith(0));
  }

  connect(collectionViewer: CollectionViewer): Observable<SaleItem[]> {

    return this.data$.pipe(map(res => res.data));
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  getFilteredElements(pageIndex: number, pageSize: number, sort: Sort, search: string = '', data): any {
    console.log(data);

    return {
      data: data.data.filter(item =>
        item.itemType.toLowerCase().includes(search.toLowerCase())
      ),
      count: 1000
    };
  }

  sortOnProperty(a: SaleItem, b: SaleItem, sort: Sort): number {
    if (sort.direction === 'asc'){
      if (a[sort.active] > b[sort.active]) {
        return 1;
      }else {
        return -1;
      }
    }
    if (a[sort.active] > b[sort.active]) {
      return -1;
    }else {
      return 1;
    }
  }
}


export interface ForSaleResult {
  data: any[];
  count: number;
}
