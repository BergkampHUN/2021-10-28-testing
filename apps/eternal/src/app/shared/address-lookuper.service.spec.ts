import { AddressLookuper } from './address-lookuper.service';

describe('Address Lookuper', () => {
  it('should allow addresses in constructor', () => {
    const addresses = ['Domgasse 15, 1010 Wien'];
    const lookuper = new AddressLookuper(addresses);

    expect(lookuper.lookup('Domgasse 5, 1010 Wien')).toBe(false);
    expect(lookuper.lookup('Domgasse 15, 1010 Wien')).toBe(true);
  });

  it('should provide a parse method', () => {
    const lookuper = new AddressLookuper([]);
    const address = lookuper.parse('Domgasse 5');
    expect(address).toEqual({ street: 'Domgasse', streetNumber: '5' });
  });

  it('should parse a German address format with city and zip', () => {
    const lookuper = new AddressLookuper([]);
    const address = lookuper.parse('Domgasse 5, 1010 Wien');
    expect(address).toEqual({
      street: 'Domgasse',
      streetNumber: '5',
      city: 'Wien',
      zip: '1010'
    });
  });

  it('should work with short query input and long address store', () => {
    const addresses = ['Domgasse 15, 1010 Wien'];
    const lookuper = new AddressLookuper(addresses);

    expect(lookuper.lookup('Domgasse 15')).toBe(true);
  });

  it('should throw an error if no street number is given', () => {
    const lookuper = new AddressLookuper([]);

    expect(() => lookuper.lookup('Domgasse')).toThrowError('Address without street number');
  });
});
