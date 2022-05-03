import React from 'react';
import {Side} from '../services/pricing-service';
import './orders.css';

export interface Order {
  id: string;
  side: Side;
  price: number;
  pair: string;
  size: number;
  value: number;
  time: number;
}

export const Orders: React.FC = () => {
  const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');

  const parseTime = (time: number) => {
    const rawDate = new Date(time);
    const date = rawDate.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
    const minutes = rawDate.getMinutes().toString().padStart(2, '0');
    const hour = rawDate.getHours();

    return `${hour}:${minutes} ${date}`;
  };

  const renderOrders = orders.map((order) => {
    const parsedTime = parseTime(order.time);
    return (
      <tr key={order.id}>
        <td>{order.side}</td>
        <td>{order.pair}</td>
        <td>{order.price.toFixed(5)}</td>
        <td>{order.size}</td>
        <td>{order.value.toFixed(2)}</td>
        <td>{parsedTime}</td>
      </tr>
    );
  });

  return (
    <div className="previousOrders">
      <h5>Previous Orders</h5>
      <table>
        <thead>
          <tr>
            <th>Side</th>
            <th>Pair</th>
            <th>Price</th>
            <th>Order Size</th>
            <th>Value</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{renderOrders}</tbody>
      </table>
    </div>
  );
};
