// pages/CartPage/CartPage.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, PageTitle } from '../../components'; // ✅ Добавляем PageTitle
import { 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart 
} from '../../store/slices/cartSlice';
import { getCartItems, getTotalPrice } from '../../store/selectors';
import type { RootState } from '../../store';
import styled from 'styled-components';

export const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => getCartItems(state));
  const totalPrice = useSelector((state: RootState) => getTotalPrice(state));

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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/250x300/007bff/ffffff?text=No+Image';
  };

  const calculateItemPrice = (price: string | undefined, quantity: number): string => {
    const priceValue = parseFloat(price?.replace('$', '') || '0');
    return `$${(priceValue * quantity).toFixed(2)}`;
  };

  if (cartItems.length === 0) {
    return (
      <Container>
        {/* ✅ Используем PageTitle с кнопкой назад */}
        <PageTitle withBackButton>YOUR CART</PageTitle>
        <EmptyCard padding="large">
          <EmptyMessage>Your cart is empty.</EmptyMessage>
          <Link to="/">
            <Button variant="primary">Continue Shopping</Button>
          </Link>
        </EmptyCard>
      </Container>
    );
  }

  return (
    <Container>
      {/* ✅ Используем PageTitle с кнопкой назад */}
      <PageTitle withBackButton>YOUR CART</PageTitle>

      <CartItemsSection>
        {cartItems.map(item => (
          <CartItemCard key={item.isbn13} padding="medium">
            <CartItemContent>
              <BookImageContainer>
                <BookImage 
                  src={item.image || 'https://via.placeholder.com/250x300/007bff/ffffff?text=No+Image'} 
                  alt={item.title || 'Book cover'}
                  onError={handleImageError}
                />
              </BookImageContainer>
              
              <BookInfoSection>
                <BookTitle to={`/books/${item.isbn13}`}>
                  {item.title || 'Untitled Book'}
                </BookTitle>
                <BookSubtitle>{item.subtitle || ''}</BookSubtitle>
                
                <PriceAndControls>
                  <ItemPrice>
                    {calculateItemPrice(item.price, item.quantity)}
                  </ItemPrice>
                  
                  <QuantityControls>
                    <QuantityButton 
                      onClick={() => handleDecreaseQuantity(item.isbn13)}
                      disabled={item.quantity <= 1}
                    >
                      –
                    </QuantityButton>
                    <QuantityDisplay>{item.quantity}</QuantityDisplay>
                    <QuantityButton 
                      onClick={() => handleIncreaseQuantity(item.isbn13)}
                    >
                      +
                    </QuantityButton>
                  </QuantityControls>
                </PriceAndControls>
              </BookInfoSection>
              
              <RemoveButton onClick={() => handleRemoveItem(item.isbn13)}>
                ×
              </RemoveButton>
            </CartItemContent>
          </CartItemCard>
        ))}
      </CartItemsSection>

      <SummarySection>
        <SummaryTopRow>
          <Button variant="secondary" onClick={handleClearCart}>
            CLEAR CART
          </Button>
          
          <TotalSection>
            <TotalLabel>TOTAL:</TotalLabel>
            <TotalValue>${totalPrice.toFixed(2)}</TotalValue>
          </TotalSection>
        </SummaryTopRow>
        
        <Button variant="primary" size="small">
          CHECK OUT
        </Button>
      </SummarySection>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
`;

// ✅ Убираем старый PageTitle styled component
const EmptyCard = styled(Card)`
  text-align: center;
  padding: 60px 40px;
`;

const EmptyMessage = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 24px;
`;

const CartItemsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const CartItemCard = styled(Card)`
  margin-bottom: 0;
  padding: 24px;
  width: 100%;
`;

const CartItemContent = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr auto;
  gap: 32px;
  align-items: start;
  
  @media (max-width: 768px) {
    grid-template-columns: 200px 1fr;
    gap: 24px;
  }
`;

const BookImageContainer = styled.div`
  width: 250px;
  height: 300px;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
`;

const BookImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const BookInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;

const BookTitle = styled(Link)`
  font-size: 22px;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  line-height: 1.3;
  
  &:hover {
    color: #007bff;
  }
`;

const BookSubtitle = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.4;
  margin: 0;
  font-style: italic;
`;

const PriceAndControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const ItemPrice = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #000000;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #e1e5e9;
  border-radius: 4px;
  padding: 8px 12px;
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  color: #333;
  font-weight: 300;
  
  &:hover:not(:disabled) {
    background-color: #f8f9fa;
  }
  
  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  padding: 0 12px;
  font-weight: 600;
  min-width: 30px;
  text-align: center;
  font-size: 16px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  font-size: 36px;
  color: #000000;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-weight: 300;
  
  &:hover {
    color: #e74c3c;
  }
`;

const SummarySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
  align-items: flex-end;
  width: 100%;
`;

const SummaryTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TotalSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TotalLabel = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #333;
`;

const TotalValue = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #000000;
`;

export default CartPage;