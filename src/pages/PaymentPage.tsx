import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const PaymentPage: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
        },
        body: JSON.stringify({
          cardNumber,
          expiryDate,
          cvv,
          items: cart,
        }),
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      clearCart();
      navigate('/user-dashboard');
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
      <div className="container mt-5">
        <h2>Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
                type="text"
                className="form-control"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Card Number"
                required
            />
          </div>
          <div className="mb-3">
            <input
                type="text"
                className="form-control"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                required
            />
          </div>
          <div className="mb-3">
            <input
                type="text"
                className="form-control"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="CVV"
                required
            />
          </div>
          <button type="submit" className="btn btn-primary">Pay Now</button>
        </form>
      </div>
  );
};

export default PaymentPage;

