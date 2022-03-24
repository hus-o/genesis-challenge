import {
  distinctUntilChanged,
  filter,
  interval,
  map,
  Observable,
  scan,
  share,
  Subject,
  Subscription
} from 'rxjs';

const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const AcceptablePriceVariance = 0.4;

export enum PriceAction {
  ADD,
  REMOVE
}

export enum Side {
  BUY,
  SELL
}

export type Currency = {code: string; name: string; symbol: string};

export const Currencies: Array<Currency> = [
  {
    code: 'GBP',
    name: 'Pound Sterling',
    symbol: '£'
  },
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€'
  },
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$'
  },
  {
    code: 'JPY',
    name: 'Japanse Yen',
    symbol: '¥'
  },
  {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: '$'
  },
  {
    code: 'CNY',
    name: 'Yuan',
    symbol: '¥'
  }
];

export type Price = {
  buy: number;
  sell: number;
};

export type PricedCurrencyPair = {
  name: string;
  ccy1: Currency;
  ccy2: Currency;
  price: Price;
};

export class CCYPair {
  private _name: string;
  private seedPrice: number;

  constructor(private ccy1: Currency, private ccy2: Currency) {
    this.seedPrice = getRandomArbitrary(0.5, 1.5);
    this._name = `${this.ccy1.code}_${this.ccy2.code}`;
  }

  get name() {
    return this._name;
  }

  subscribeToPrices$(): Observable<PricedCurrencyPair> {
    return interval(Math.random() * 1000 + 2000).pipe(
      map(() => ({
        name: this.name,
        ccy1: this.ccy1,
        ccy2: this.ccy2,
        price: this.getPriceTick()
      }))
    );
  }

  private getPriceTick(): Price {
    const buyPrice = this.seedPrice + getRandomArbitrary(-0.07, 0.07);
    const sellPrice = this.seedPrice + getRandomArbitrary(-0.07, 0.07);
    
    return {
      buy: buyPrice,
      sell: sellPrice
    };
  }
}

export class PricingService {
  private ccySubject = new Subject<{action: PriceAction; ccyPair: CCYPair}>();
  private pricesSubject = new Subject<PricedCurrencyPair>();

  public prices$ = this.pricesSubject.asObservable().pipe(share());

  constructor() {
    this.ccySubject
      .asObservable()
      .pipe(
        scan((acc, {action, ccyPair}) => {
          switch (action) {
            case PriceAction.REMOVE: {
              const saved = acc[ccyPair.name];
              saved.subscription.unsubscribe();
              delete acc[ccyPair.name];
              return acc;
            }
            case PriceAction.ADD: {
              if (acc[ccyPair.name]) {
                return acc;
              }
              const sub = ccyPair.subscribeToPrices$();
              return {
                ...acc,
                [ccyPair.name]: {
                  subscription: ccyPair.subscribeToPrices$().subscribe(this.pricesSubject),
                  ccyPair
                }
              };
            }
          }
        }, <Record<string, {subscription: Subscription; ccyPair: CCYPair}>>{}),
        distinctUntilChanged()
      )
      .subscribe();
  }

  getCCYPair$(name: string) {
    return this.prices$.pipe(filter((ccyPair) => ccyPair.name === name));
  }

  watchCCYPair(ccy1: Currency, ccy2: Currency) {
    const ccyPair = new CCYPair(ccy1, ccy2);
    this.ccySubject.next({action: PriceAction.ADD, ccyPair});
    return ccyPair;
  }

  unwatchCCYPair(ccyPair: CCYPair) {
    this.ccySubject.next({action: PriceAction.REMOVE, ccyPair});
  }
}
