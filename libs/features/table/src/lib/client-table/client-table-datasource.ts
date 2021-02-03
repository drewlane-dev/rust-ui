import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import { delay, filter, map, shareReplay, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import {Sort} from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';

export class InventoryDataSource implements DataSource<InventoryItem> {

  private readonly data$: Observable<InventoryResult>;
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

    this.count$ = this.data$.pipe( map(data => data.count), startWith(ELEMENT_DATA.length));
  }

  connect(collectionViewer: CollectionViewer): Observable<InventoryItem[]> {

    return this.data$.pipe(map(res => res.data));
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  getFilteredElements(pageIndex: number, pageSize: number, sort: Sort, search: string = '', data): any {
    console.log(data);

    return {
      data: data.data.filter(item => item.detail != null && item.detail.title.toLowerCase().includes(search.toLowerCase())),
      count: 1000
    };
  }

  sortOnProperty(a: InventoryItem, b: InventoryItem, sort: Sort): number {
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

export interface InventoryItem {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface InventoryResult {
  data: any[];
  count: number;
}


// Example Data
const ELEMENT_DATA: InventoryItem[] = [
  {weight: 1.0079, name: 	'Hydrogen', symbol: 	'H', position:	1},
  {weight: 4.0026, name: 	'Helium', symbol: 	'He', position:	2},
  {weight: 6.941, name: 	'Lithium', symbol: 	'Li', position:	3},
  {weight: 9.0122, name: 	'Beryllium', symbol: 	'Be', position:	4},
  {weight: 10.811, name: 	'Boron', symbol: 	'B', position:	5},
  {weight: 12.0107, name: 	'Carbon', symbol: 	'C', position:	6},
  {weight: 14.0067, name: 	'Nitrogen', symbol: 	'N', position:	7},
  {weight: 15.9994, name: 	'Oxygen', symbol: 	'O', position:	8},
  {weight: 18.9984, name: 	'Fluorine', symbol: 	'F', position:	9},
  {weight: 20.1797, name: 	'Neon', symbol: 	'Ne', position:	10},
  {weight: 22.9897, name: 	'Sodium', symbol: 	'Na', position:	11},
  {weight: 24.305, name: 	'Magnesium', symbol: 	'Mg', position:	12},
  {weight: 26.9815, name: 	'Aluminum', symbol: 	'Al', position:	13},
  {weight: 28.0855, name: 	'Silicon', symbol: 	'Si', position:	14},
  {weight: 30.9738, name: 	'Phosphorus', symbol: 	'P', position:	15},
  {weight: 32.065, name: 	'Sulfur', symbol: 	'S', position:	16},
  {weight: 35.453, name: 	'Chlorine', symbol: 	'Cl', position:	17},
  {weight: 39.0983, name: 	'Potassium', symbol: 	'K', position:	19},
  {weight: 39.948, name: 	'Argon', symbol: 	'Ar', position:	18},
  {weight: 40.078, name: 	'Calcium', symbol: 	'Ca', position:	20},
  {weight: 44.9559, name: 	'Scandium', symbol: 	'Sc', position:	21},
  {weight: 47.867, name: 	'Titanium', symbol: 	'Ti', position:	22},
  {weight: 50.9415, name: 	'Vanadium', symbol: 	'V', position:	23},
  {weight: 51.9961, name: 	'Chromium', symbol: 	'Cr', position:	24},
  {weight: 54.938, name: 	'Manganese', symbol: 	'Mn', position:	25},
  {weight: 55.845, name: 	'Iron', symbol: 	'Fe', position:	26},
  {weight: 58.6934, name: 	'Nickel', symbol: 	'Ni', position:	28},
  {weight: 58.9332, name: 	'Cobalt', symbol: 	'Co', position:	27},
  {weight: 63.546, name: 	'Copper', symbol: 	'Cu', position:	29},
  {weight: 65.39, name: 	'Zinc', symbol: 	'Zn', position:	30},
  {weight: 69.723, name: 	'Gallium', symbol: 	'Ga', position:	31},
  {weight: 72.64, name: 	'Germanium', symbol: 	'Ge', position:	32},
  {weight: 74.9216, name: 	'Arsenic', symbol: 	'As', position:	33},
  {weight: 78.96, name: 	'Selenium', symbol: 	'Se', position:	34},
  {weight: 79.904, name: 	'Bromine', symbol: 	'Br', position:	35},
  {weight: 83.8, name: 	'Krypton', symbol: 	'Kr', position:	36},
  {weight: 85.4678, name: 	'Rubidium', symbol: 	'Rb', position:	37},
  {weight: 87.62, name: 	'Strontium', symbol: 	'Sr', position:	38},
  {weight: 88.9059, name: 	'Yttrium', symbol: 	'Y', position:	39},
  {weight: 91.224, name: 	'Zirconium', symbol: 	'Zr', position:	40},
  {weight: 92.9064, name: 	'Niobium', symbol: 	'Nb', position:	41},
  {weight: 95.94, name: 	'Molybdenum', symbol: 	'Mo', position:	42},
  {weight: 98.0, name: 	'Technetium', symbol: 	'Tc', position:	43},
  {weight: 101.07, name: 	'Ruthenium', symbol: 	'Ru', position:	44},
  {weight: 102.9055, name: 	'Rhodium', symbol: 	'Rh', position:	45},
  {weight: 106.42, name: 	'Palladium', symbol: 	'Pd', position:	46},
  {weight: 107.8682, name: 	'Silver', symbol: 	'Ag', position:	47},
  {weight: 112.411, name: 	'Cadmium', symbol: 	'Cd', position:	48},
  {weight: 114.818, name: 	'Indium', symbol: 	'In', position:	49},
  {weight: 118.71, name: 	'Tin', symbol: 	'Sn', position:	50},
  {weight: 121.76, name: 	'Antimony', symbol: 	'Sb', position:	51},
  {weight: 126.9045, name: 	'Iodine', symbol: 	'I', position:	53},
  {weight: 127.6, name: 	'Tellurium', symbol: 	'Te', position:	52},
  {weight: 131.293, name: 	'Xenon', symbol: 	'Xe', position:	54},
  {weight: 132.9055, name: 	'Cesium', symbol: 	'Cs', position:	55},
  {weight: 137.327, name: 	'Barium', symbol: 	'Ba', position:	56},
  {weight: 138.9055, name: 	'Lanthanum', symbol: 	'La', position:	57},
  {weight: 140.116, name: 	'Cerium', symbol: 	'Ce', position:	58},
  {weight: 140.9077, name: 	'Praseodymium', symbol: 	'Pr', position:	59},
  {weight: 144.24, name: 	'Neodymium', symbol: 	'Nd', position:	60},
  {weight: 145.0, name: 	'Promethium', symbol: 	'Pm', position:	61},
  {weight: 150.36, name: 	'Samarium', symbol: 	'Sm', position:	62},
  {weight: 151.964, name: 	'Europium', symbol: 	'Eu', position:	63},
  {weight: 157.25, name: 	'Gadolinium', symbol: 	'Gd', position:	64},
  {weight: 158.9253, name: 	'Terbium', symbol: 	'Tb', position:	65},
  {weight: 162.5, name: 	'Dysprosium', symbol: 	'Dy', position:	66},
  {weight: 164.9303, name: 	'Holmium', symbol: 	'Ho', position:	67},
  {weight: 167.259, name: 	'Erbium', symbol: 	'Er', position:	68},
  {weight: 168.9342, name: 	'Thulium', symbol: 	'Tm', position:	69},
  {weight: 173.04, name: 	'Ytterbium', symbol: 	'Yb', position:	70},
  {weight: 174.967, name: 	'Lutetium', symbol: 	'Lu', position:	71},
  {weight: 178.49, name: 	'Hafnium', symbol: 	'Hf', position:	72},
  {weight: 180.9479, name: 	'Tantalum', symbol: 	'Ta', position:	73},
  {weight: 183.84, name: 	'Tungsten', symbol: 	'W', position:	74},
  {weight: 186.207, name: 	'Rhenium', symbol: 	'Re', position:	75},
  {weight: 190.23, name: 	'Osmium', symbol: 	'Os', position:	76},
  {weight: 192.217, name: 	'Iridium', symbol: 	'Ir', position:	77},
  {weight: 195.078, name: 	'Platinum', symbol: 	'Pt', position:	78},
  {weight: 196.9665, name: 	'Gold', symbol: 	'Au', position:	79},
  {weight: 200.59, name: 	'Mercury', symbol: 	'Hg', position:	80},
  {weight: 204.3833, name: 	'Thallium', symbol: 	'Tl', position:	81},
  {weight: 207.2, name: 	'Lead', symbol: 	'Pb', position:	82},
  {weight: 208.9804, name: 	'Bismuth', symbol: 	'Bi', position:	83},
  {weight: 209.0, name: 	'Polonium', symbol: 	'Po', position:	84},
  {weight: 210.0, name: 	'Astatine', symbol: 	'At', position:	85},
  {weight: 222.0, name: 	'Radon', symbol: 	'Rn', position:	86},
  {weight: 223.0, name: 	'Francium', symbol: 	'Fr', position:	87},
  {weight: 226.0, name: 	'Radium', symbol: 	'Ra', position:	88},
  {weight: 227.0, name: 	'Actinium', symbol: 	'Ac', position:	89},
  {weight: 231.0359, name: 	'Protactinium', symbol: 	'Pa', position:	91},
  {weight: 232.0381, name: 	'Thorium', symbol: 	'Th', position:	90},
  {weight: 237.0, name: 	'Neptunium', symbol: 	'Np', position:	93},
  {weight: 238.0289, name: 	'Uranium', symbol: 	'U', position:	92},
  {weight: 243.0, name: 	'Americium', symbol: 	'Am', position:	95},
  {weight: 244.0, name: 	'Plutonium', symbol: 	'Pu', position:	94},
  {weight: 247.0, name: 	'Curium', symbol: 	'Cm', position:	96},
  {weight: 247.0, name: 	'Berkelium', symbol: 	'Bk', position:	97},
  {weight: 251.0, name: 	'Californium', symbol: 	'Cf', position:	98},
  {weight: 252.0, name: 	'Einsteinium', symbol: 	'Es', position:	99},
  {weight: 257.0, name: 	'Fermium', symbol: 	'Fm', position:	100},
  {weight: 258.0, name: 	'Mendelevium', symbol: 	'Md', position:	101},
  {weight: 259.0, name: 	'Nobelium', symbol: 	'No', position:	102},
  {weight: 261.0, name: 	'Rutherfordium', symbol: 	'Rf', position:	104},
  {weight: 262.0, name: 	'Lawrencium', symbol: 	'Lr', position:	103},
  {weight: 262.0, name: 	'Dubnium', symbol: 	'Db', position:	105},
  {weight: 264.0, name: 	'Bohrium', symbol: 	'Bh', position:	107},
  {weight: 266.0, name: 	'Seaborgium', symbol: 	'Sg', position:	106},
  {weight: 268.0, name: 	'Meitnerium', symbol: 	'Mt', position:	109},
  {weight: 272.0, name: 	'Roentgenium', symbol: 	'Rg', position:	111},
  {weight: 277.0, name: 	'Hassium', symbol: 	'Hs', position:	108},
];
