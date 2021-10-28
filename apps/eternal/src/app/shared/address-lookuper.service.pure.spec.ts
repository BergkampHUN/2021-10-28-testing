import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { AddressLookuper } from './address-lookuper.service';
import { assertType } from './assert-type';

jest.mock('./parse-address', () => ({ parseAddress: () => true }));

it('should mock parseAddress', () => {
  const lookuper = new AddressLookuper(assertType<HttpClient>({ get: () => of(['']) }));
  lookuper.lookup('abcd');
});
