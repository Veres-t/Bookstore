// pages/CartPage/CartPage.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, PageTitle, BackButton } from '../../components';
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
    e.currentTarget.src = 'https://via.placeholder.com/150x180/007bff/ffffff?text=No+Image';
  };

  const calculateItemPrice = (price: string | undefined, quantity: number): string => {
    const priceValue = parseFloat(price?.replace('$', '') || '0');
    return `$${(priceValue * quantity).toFixed(2)}`;
  };

  if (cartItems.length === 0) {
    return (
      <Container>
        <BackButton />
        <PageTitle>YOUR CART</PageTitle>
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
      <BackButton />
      <PageTitle>YOUR CART</PageTitle>

      <CartItemsSection>
        {cartItems.map(item => (
          <CartItemCard key={item.isbn13} padding="medium">
            <CartItemGrid>
              <BookImageContainer>
                <BookImage 
                  src={item.image || 'https://via.placeholder.com/150x180/007bff/ffffff?text=No+Image'} 
                  alt={item.title || 'Book cover'}
                  onError={handleImageError}
                />
              </BookImageContainer>
              <BookInfoAndCounterSection>
                <BookInfoSection>
                  <BookTitle to={`/books/${item.isbn13}`}>
                    {item.title || 'Untitled Book'}
                  </BookTitle>
                  <BookAuthors>{item.authors || 'Unknown author'}</BookAuthors>
                  <BookPublisher>{item.publisher ? `by ${item.publisher}` : ''}</BookPublisher>
                  <BookYear>{item.year ? `${item.year}` : ''}</BookYear>
                  
                  <MobilePrice>
                    {calculateItemPrice(item.price, item.quantity)}
                  </MobilePrice>
                </BookInfoSection>
                
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
              </BookInfoAndCounterSection>
              
              
              <DesktopPriceSection>
                <ItemPrice>
                  {calculateItemPrice(item.price, item.quantity)}
                </ItemPrice>
              </DesktopPriceSection>
              
              
              <RemoveButton onClick={() => handleRemoveItem(item.isbn13)}>
                ×
              </RemoveButton>
            </CartItemGrid>
          </CartItemCard>
        ))}
      </CartItemsSection>

      <SummarySection>
        <SummaryTopRow>
          <ClearCartButton variant="secondary" onClick={handleClearCart}>
            CLEAR CART
          </ClearCartButton>
          
          <TotalSection>
            <TotalLabel>TOTAL:</TotalLabel>
            <TotalValue>${totalPrice.toFixed(2)}</TotalValue>
          </TotalSection>
        </SummaryTopRow>
        
        <CheckoutButton variant="primary" size="small">
          CHECK OUT
        </CheckoutButton>
      </SummarySection>
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 16px;
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
    gap: 16px;
  }
`;

const EmptyCard = styled(Card)`
  text-align: center;
  padding: 60px 40px;
  
  @media (max-width: 768px) {
    padding: 40px 24px;
  }
  
  @media (max-width: 480px) {
    padding: 32px 16px;
  }
`;

const EmptyMessage = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 24px;
  
  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const CartItemsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const CartItemCard = styled(Card)`
  margin-bottom: 0;
  padding: 16px;
  width: 100%;
  
  @media (max-width: 480px) {
    padding: 12px;
  }
`;


const DesktopPriceSection = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-left: -10px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const CartItemGrid = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr auto auto;
  gap: 20px;
  align-items: start;
  
  /* 📱 Планшет */
  @media (max-width: 768px) {
    grid-template-columns: 120px 1fr auto;
    gap: 16px;
  }
  
  /* 📱 Мобильные */
  @media (max-width: 480px) {
    grid-template-columns: 80px 1fr auto;
    gap: 12px;
  }
`;

const BookImageContainer = styled.div`
  width: 150px;
  height: 180px;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  
  @media (max-width: 768px) {
    width: 120px;
    height: 150px;
    padding: 12px;
  }
  
  @media (max-width: 480px) {
    width: 80px;
    height: 100px;
    padding: 8px;
  }
`;

const BookImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const BookInfoAndCounterSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 12px;
  
  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const BookInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const BookTitle = styled(Link)`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  line-height: 1.3;
  margin-bottom: 2px;
  
  &:hover {
    color: #007bff;
  }
  
  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 1.2;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
    margin-bottom: 1px;
  }
`;

const BookAuthors = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  font-weight: 500;
  
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const BookPublisher = styled.p`
  font-size: 12px;
  color: #888;
  margin: 0;
  font-style: italic;
  
  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const BookYear = styled.p`
  font-size: 12px;
  color: #888;
  margin: 0;
  
  @media (max-width: 480px) {
    font-size: 11px;
  }
`;


const MobilePrice = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    font-size: 20px;
    font-weight: 700;
    color: #000000;
    margin-top: 8px;
  }
  
  @media (max-width: 480px) {
    font-size: 18px;
    margin-top: 6px;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #e1e5e9;
  border-radius: 4px;
  padding: 6px 10px;
  width: fit-content;
  
  @media (max-width: 480px) {
    gap: 6px;
    padding: 4px 8px;
  }
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  color: #333;
  font-weight: 300;
  
  &:hover:not(:disabled) {
    background-color: #f8f9fa;
  }
  
  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
  
  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
    font-size: 14px;
  }
`;

const QuantityDisplay = styled.span`
  padding: 0 10px;
  font-weight: 600;
  min-width: 25px;
  text-align: center;
  font-size: 14px;
  
  @media (max-width: 480px) {
    padding: 0 8px;
    min-width: 20px;
    font-size: 13px;
  }
`;

const ItemPrice = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #000000;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  color: #000000;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-weight: 300;
  
  &:hover {
    color: #e74c3c;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
    width: 28px;
    height: 28px;
  }
`;

const SummarySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
  align-items: flex-end;
  width: 100%;
  
  @media (max-width: 768px) {
    margin-top: 20px;
    gap: 12px;
  }
`;

const SummaryTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
`;

const ClearCartButton = styled(Button)`
  @media (max-width: 480px) {
    width: 100%;
    order: 2;
  }
`;

const CheckoutButton = styled(Button)`
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const TotalSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  
  @media (max-width: 480px) {
    justify-content: space-between;
    order: 1;
  }
`;

const TotalLabel = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const TotalValue = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export default CartPage;