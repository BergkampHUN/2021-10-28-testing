import { debounceTime, first, Observable, of } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { filter, map } from 'rxjs/operators';

function myFunction(): Observable<number> {
  return of(1);
}

describe('RxJs', () => {
  it(
    'should test myFunction',
    marbles((m) => {
      const source$ = m.cold('2ms a--b', { a: 10, b: 100 });
      const destination$ = source$.pipe(
        filter((number) => number > 10),
        map((number) => number / 2),
        debounceTime(500),
        first()
      );

      m.expect(destination$).toBeObservable('505ms (z|)', { z: 50 });
    })
  );

  it(
    'should test myFunction',
    marbles((m) => {
      m.expect(myFunction()).toBeObservable('(z|)', { z: 1 });
    })
  );

  it.skip(
    'should test hello world of observables',
    marbles((m) => {
      const source$ = m.cold('2ms a--b', { a: 10, b: 100 });
      const destination$ = source$.pipe(
        filter((number) => number > 10),
        map((number) => number / 2)
      );
      m.expect(destination$).toBeObservable('v', { z: 50333 });
    })
  );
});
