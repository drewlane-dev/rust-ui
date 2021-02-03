import {Observable} from 'rxjs';

export interface Link {
   href: string;
   icon: string | Observable<string>;
   label: string;
   guard?: Observable<boolean>;
}
