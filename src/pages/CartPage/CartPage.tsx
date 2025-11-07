// pages/CartPage/CartPage.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heading, Button, Card } from '../../components';
import { 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart 
} from '../../store/slices/cartSlice';
import { getCartItems, getTotalPrice, getTotalItems } from '../../store/selectors';
import type { RootState } from '../../store';

export const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => getCartItems(state));
  const totalPrice = useSelector((state: RootState) => getTotalPrice(state));
  const totalItems = useSelector((state: RootState) => getTotalItems(state));

  const handleIncreaseQuantity = (isbn13: string) => {
    dispatch(increaseQuantity({ isbn13 }));
  };

  const handleDecreaseQuantity = (isbn13: string) => {
    dispatch(decreaseQuantity({ isbn13 }));
  };

  const handleRemoveItem = (isbn13: string) => {
    dispatch(removeFromCart({ isbn13 }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Функция для обработки ошибки загрузки изображения
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/80x100/cccccc/969696?text=No+Image';
  };

  // Функция для вычисления цены товара
  const calculateItemPrice = (price: string | undefined, quantity: number): string => {
    const priceValue = parseFloat(price?.replace('$', '') || '0');
    return `$${(priceValue * quantity).toFixed(2)}`;
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <Heading level={1}>Shopping Cart</Heading>
        <Card padding="large">
          <p>Your cart is empty.</p>
          <Link to="/">
            <Button variant="primary">Continue Shopping</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Heading level={1}>Shopping Cart ({totalItems} items)</Heading>
        <Button variant="outline" onClick={handleClearCart}>
          Clear Cart
        </Button>
      </div>

      <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
        {cartItems.map(item => (
          <Card key={item.isbn13} padding="medium">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <img 
                src={item.image || 'https://via.placeholder.com/80x100/cccccc/969696?text=No+Image'} 
                alt={item.title || 'Book cover'}
                style={{ width: '80px', height: 'auto' }}
                onError={handleImageError}
              />
              <div style={{ flex: 1 }}>
                <Heading level={3}>
                  <Link to={`/books/${item.isbn13}`}>{item.title || 'Untitled Book'}</Link>
                </Heading>
                <p>{item.subtitle || ''}</p>
                <p><strong>Price:</strong> {item.price || '$0.00'}</p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Button 
                      variant="outline" 
                      onClick={() => handleDecreaseQuantity(item.isbn13)}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      onClick={() => handleIncreaseQuantity(item.isbn13)}
                    >
                      +
                    </Button>
                  </div>
                  <Button 
                    variant="secondary" 
                    onClick={() => handleRemoveItem(item.isbn13)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Heading level={4}>
                  {calculateItemPrice(item.price, item.quantity)}
                </Heading>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card padding="large">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Heading level={2}>Total: ${totalPrice.toFixed(2)}</Heading>
          <Button variant="primary">
            Proceed to Checkout
          </Button>
        </div>
      </Card>
    </div>
  );
};