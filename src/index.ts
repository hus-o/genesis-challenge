import {Currencies, PricingService} from './services/pricing-service';

const pricingService = new PricingService();

pricingService.prices$.subscribe((tick) => {
  console.log(`${tick.name}
    ${tick.ccy1.code} BUY:${tick.price.buy} - ${tick.ccy2.code} SELL:${tick.price.sell}
    `);
});

const ccyPair1 = pricingService.watchCCYPair(Currencies[0], Currencies[1]);
const ccyPair2 = pricingService.watchCCYPair(Currencies[2], Currencies[3]);
