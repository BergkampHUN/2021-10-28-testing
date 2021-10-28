import { fakeAsync, flush, flushMicrotasks, tick, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

describe('Async Test', () => {
  it(
    'should not work',
    waitForAsync(() => {
      let a = 1;
      window.setTimeout(() => {
        a = a + 1;
        expect(a).toBe(2);
      });
    })
  );

  it('should use a Promise', () => {
    let a = 1;
    const promise = Promise.resolve().then(() => {
      a = a + 1;
      return a;
    });

    return expect(promise).resolves.toBe(2);
  });

  it('should use async / await', async () => {
    let a = 1;
    const promise = Promise.resolve().then(() => {
      a = a + 1;
      return a;
    });

    expect(await promise).toBe(2);
  });

  it(
    'should use waitForAsync',
    waitForAsync(() => {
      let a = 1;
      Promise.resolve().then(() => {
        a = a + 1;
        expect(a).toBe(2);
      });
    })
  );

  it('should use fakeAsync', fakeAsync(() => {
    let a = 1;

    window.setTimeout(() => (a = a + 10));
    window.setTimeout(() => (a = a + 100), 10000);
    Promise.resolve().then(() => (a = a + 1));

    flushMicrotasks();
    expect(a).toBe(2);

    tick();
    expect(a).toBe(12);

    tick(10000);
    expect(a).toBe(112);
  }));

  it('should use fakeAsync with flush', fakeAsync(() => {
    let a = 1;

    window.setTimeout(() => (a = a + 10));
    window.setTimeout(() => (a = a + 100), 10000);
    Promise.resolve().then(() => (a = a + 1));

    flush();
    expect(a).toBe(112);
  }));

  it.todo('should use fakeAsync window.setInterval');

  it(
    'should test with RxJs',
    waitForAsync(() => {
      let a = 1;

      of(1).subscribe((value) => {
        a = a + value;
        expect(a).toBe(2);
      });

      expect(a).toBe(2);
    })
  );
});
