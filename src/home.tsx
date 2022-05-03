import React, {useState} from 'react';
import {Currencies, Currency} from './services/pricing-service';
import './index.css';
import classNames from 'classnames';
import {TradingModal} from './components/trading-modal';
import {Orders} from './components/orders';

export const Home: React.FC = () => {
  const [modalToggle, setModalToggle] = useState(false);
  const [selectedCurrencies, setSelectedCurrencies] = useState<Currency[]>([]);
  const isMaxSelection = selectedCurrencies.length === 2;

  const handleSelection = (currency: Currency) => {
    const exists = selectedCurrencies.find((c) => c.code === currency.code);
    exists
      ? setSelectedCurrencies(selectedCurrencies.filter((c) => c.code !== currency.code))
      : setSelectedCurrencies([...selectedCurrencies, currency]);
  };

  const renderCurrencies = Currencies.map((currency, index) => {
    const isSelected = Boolean(selectedCurrencies.find((c) => c.code === currency.code));
    const isDisabled = isMaxSelection && !isSelected;
    return (
      <div
        key={index}
        className={classNames('currencyList', {selected: isSelected}, {disabled: isDisabled})}
      >
        <label onClick={() => handleSelection(currency)} htmlFor={`toggle${index}`}>
          {currency.code}
        </label>
        <input type="checkbox" id={`toggle${index}`} className="visually-hidden"></input>
      </div>
    );
  });
  return (
    <main>
      <h1 className="header">Simple FX</h1>
      <div className="contentContainer">
        <div className="currencyContainer">
          <h5>Pick the currency pair you want to trade</h5>
          {renderCurrencies}
          <button
            disabled={!isMaxSelection}
            className="tradeButton"
            onClick={() => setModalToggle(true)}
          >
            Trade
          </button>
        </div>
        <Orders />
      </div>
      {modalToggle && <TradingModal onDismiss={setModalToggle} currencies={selectedCurrencies} />}
    </main>
  );
};
