import { HttpClient, HttpParams } from '@angular/common/http';
import { waitForAsync } from '@angular/core/testing';
import { createSpyFromClass } from 'jest-auto-spies';
import { asyncScheduler, Observable, of, scheduled } from 'rxjs';
import { marbles } from 'rxjs-marbles';
import { AddressLookuper } from './address-lookuper.service';
import { assertType } from './assert-type';

describe('Address Lookuper', () => {
  for (const { isValid, response } of [
    {
      response: [null, true],
      isValid: true
    },
    {
      response: [],
      isValid: false
    }
  ]) {
    it(
      `should return ${isValid} for ${response}`,
      waitForAsync(() => {
        const httpClientStub = assertType<HttpClient>({
          get: () => scheduled([response], asyncScheduler)
        });

        const lookuper = new AddressLookuper(httpClientStub);

        lookuper.lookup('Domgasse 5').subscribe((value) => expect(value).toBe(isValid));
      })
    );
  }

  it('should test with a mock', () => {
    const httpClientMock = {
      get: jest.fn<Observable<unknown[]>, [string, { params: HttpParams }]>(() => of(['']))
    };
    const lookuper = new AddressLookuper(assertType<HttpClient>(httpClientMock));

    lookuper.lookup('Domgasse 5');

    const [url, { params }] = httpClientMock.get.mock.calls[0];

    expect(url).toBe('https://nominatim.openstreetmap.org/search.php');
    expect(params).toEqual(new HttpParams().set('format', 'jsonv2').set('q', 'Domgasse 5'));
  });

  it('should test with jest-auto-spies', () => {
    const httpClientMock = createSpyFromClass(HttpClient);
    httpClientMock.get.mockReturnValue(of(['']));

    const lookuper = new AddressLookuper(httpClientMock);

    lookuper.lookup('Domgasse 5');
    const [url, { params }] = httpClientMock.get.mock.calls[0];
    expect(url).toBe('https://nominatim.openstreetmap.org/search.php');
    expect(params).toEqual(new HttpParams().set('format', 'jsonv2').set('q', 'Domgasse 5'));
  });

  it('should throw an error if no street number is given', () => {
    const lookuper = new AddressLookuper(assertType<HttpClient>());

    expect(() => lookuper.lookup('Domgasse')).toThrowError(
      'Could not parse address. Invalid format.'
    );
  });

  it(
    'should test with RxJs marbles',
    marbles((m) => {
      const httpClientStub = assertType<HttpClient>({
        get: () => m.cold('750ms a', { a: [true] })
      });
      const lookuper = new AddressLookuper(httpClientStub);

      m.expect(lookuper.lookup('Domgasse 5')).toBeObservable('750ms t', { t: true });
    })
  );
});
