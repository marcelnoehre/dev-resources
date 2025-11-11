import { Injectable } from '@angular/core';
import { fromEvent, map, startWith } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Screen {
  scrollX$ = fromEvent(window, 'scroll').pipe(
    map(() => window.scrollX),
    startWith(window.scrollX)
  );

  scrollY$ = fromEvent(window, 'scroll').pipe(
    map(() => window.scrollY),
    startWith(window.scrollY)
  );

  width$ = fromEvent(window, 'resize').pipe(
    map(() => window.innerWidth),
    startWith(window.innerWidth)
  );

  height$ = fromEvent(window, 'resize').pipe(
    map(() => window.innerHeight),
    startWith(window.innerHeight)
  );
}