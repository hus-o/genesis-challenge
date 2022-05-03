import React, {useEffect, useState} from 'react';
import {XIcon} from '@heroicons/react/solid';
import './modal.css';
import {
  AcceptablePriceVariance,
  Currency,
  Price,
  PricingService,
  Side
} from '../services/pricing-service';
import {Input} from './input';
import {v4} from 'uuid';
import {Order} from './orders';

interface Purchase {
  side: Side;
  price: number;
}

interface TradingModalProps {
  onDismiss: React.Dispatch<React.SetStateAction<boolean>>;
  currencies: Currency[];
}

export const TradingModal: React.FC<TradingModalProps> = ({onDismiss, currencies}) => {
  const base = currencies[0];
  const quote = currencies[1];
  const [currentPrice, setCurrentPrice] = useState<Price>();
  const [quantity, setQuantity] = useState<number | undefined>();
  const [purchase, setPurchase] = useState<Purchase | undefined>();
  const pricingService = new PricingService();
  const ccyPair = pricingService.watchCCYPair(base, quote);

  useEffect(() => {
    const subscription = ccyPair
      .subscribeToPrices$()
      .subscribe((result) => setCurrentPrice(result.price));

    return () => subscription.unsubscribe();
  }, []);

  const handlePurchase = (side: Side, price: number) => {
    setPurchase({side, price});
  };

  return (
    <div className="modal">
      <div className="background" />
      <div className="content" onClick={(e) => e.stopPropagation()}>
        <XIcon className="close" onClick={() => onDismiss(false)} />
        <div className="pairCode">{purchase ? 'Confirm Order' : `${base.code}/${quote.code}`}</div>
        {purchase ? (
          <ConfirmCard
            side={purchase.side}
            size={quantity}
            pair={`${base.code}/${quote.code}`}
            price={purchase.price}
            currentPrice={purchase.side === Side.BUY ? currentPrice.buy : currentPrice.sell}
            onClose={onDismiss}
          />
        ) : (
          <PurchaseCard
            quantity={quantity}
            setQuantity={setQuantity}
            currentPrice={currentPrice}
            handlePurchase={handlePurchase}
          />
        )}
      </div>
    </div>
  );
};

interface PurchaseCardProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  currentPrice: Price;
  handlePurchase: (side: Side, price: number) => void;
}

export const PurchaseCard: React.FC<PurchaseCardProps> = ({
  quantity,
  setQuantity,
  currentPrice,
  handlePurchase
}) => {
  return (
    <>
      <Input
        min={1}
        value={quantity ?? ''}
        placeholder="Enter order size"
        onChange={({target}) => {
          const v = target.value ? +target.value : undefined;
          setQuantity(v);
        }}
      />
      {!quantity ? (
        <p>Please input an order size</p>
      ) : currentPrice ? (
        <div className="buttonContainer">
          <TransactionButton value={currentPrice.buy} side={Side.BUY} onClick={handlePurchase} />
          <TransactionButton value={currentPrice.sell} side={Side.SELL} onClick={handlePurchase} />
        </div>
      ) : (
        <p>Fetching</p>
      )}
    </>
  );
};

interface ConfirmCardProps {
  side: Side;
  size: number;
  pair: string;
  price: number;
  currentPrice: number;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConfirmCard: React.FC<ConfirmCardProps> = ({
  side,
  size,
  pair,
  price,
  currentPrice,
  onClose
}) => {
  const message = `You are about to ${side.toUpperCase()} ${size} ${pair} at ${price.toFixed(
    5
  )} are you sure ?`;
  const percDiff = (((currentPrice - price) / price) * 100).toFixed(2);
  const warning =
    price - AcceptablePriceVariance > currentPrice ||
    price - AcceptablePriceVariance < currentPrice;

  const handleConfirm = () => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder: Order = {
      id: v4(),
      side: side,
      price: price,
      pair: pair,
      size: size,
      value: price * size,
      time: Date.now()
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    onClose(false);
  };

  return (
    <>
      <div className="confirmMessage">{message}</div>
      <div className="confirmCurrentPrice">
        Current Price: {currentPrice.toFixed(5)} ({percDiff}%)
      </div>
      {warning && (
        <div className="warningMsg">
          Warning: The price has moved more than the acceptable variance (0.4)
        </div>
      )}
      <button className="tradeButton" onClick={handleConfirm}>
        Confirm
      </button>
    </>
  );
};

interface TransactionButtonProps {
  value: number;
  side: Side;
  onClick: (side: Side, price: number) => void;
}
export const TransactionButton: React.FC<TransactionButtonProps> = ({value, side, onClick}) => {
  return (
    <button disabled={!value} className="tradeButton" onClick={() => onClick(side, value)}>
      {`${side} at ${value.toFixed(4)}`}
    </button>
  );
};
