// pages/FavoritesPage/FavoritesPage.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, StarRating, PageTitle, BackButton } from '../../components'; // ✅ Добавляем BackButton
import { removeFromFavorites, clearFavorites } from '../../store/slices/favoritesSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { getFavoritesItems } from '../../store/selectors';
import type { RootState } from '../../store';
import type { Book } from '../../types';
import styled from 'styled-components';

export const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => getFavoritesItems(state));

  const handleRemoveFromFavorites = (isbn13: string) => {
    dispatch(removeFromFavorites({ isbn13 }));
  };

  const handleAddToCart = (book: Book) => {
    dispatch(addToCart({ book }));
  };

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/100x120/cccccc/969696?text=No+Image';
  };

  if (favorites.length === 0) {
    return (
      <Container>
        {/* ✅ РАЗДЕЛЬНО: BackButton и PageTitle */}
        <BackButton />
        <PageTitle>Favorites</PageTitle>
        <EmptyCard padding="large">
          <EmptyMessage>No favorite books yet.</EmptyMessage>
          <Link to="/">
            <Button variant="primary">Discover Books</Button>
          </Link>
        </EmptyCard>
      </Container>
    );
  }

  return (
    <Container>
      {/* ✅ РАЗДЕЛЬНО: BackButton и PageTitle */}
      <BackButton />
      
      <HeaderRow>
        {/* ✅ ТОЛЬКО PageTitle - без кнопки назад */}
        <PageTitle>{`Favorites (${favorites.length})`}</PageTitle>
        <Button variant="secondary" onClick={handleClearFavorites}>
          Clear All
        </Button>
      </HeaderRow>

      <FavoritesGrid>
        {favorites.map(book => (
          <FavoriteCard key={book.isbn13} padding="medium">
            <CardContent>
              <BookImage 
                src={book.image || 'https://via.placeholder.com/100x120/cccccc/969696?text=No+Image'} 
                alt={book.title || 'Book cover'}
                onError={handleImageError}
              />
              <BookInfo>
                <BookTitle to={`/books/${book.isbn13}`}>
                  {book.title || 'Untitled Book'}
                </BookTitle>
                <BookSubtitle>{book.subtitle || ''}</BookSubtitle>
                <BookDetails>
                  <strong>Authors:</strong> {book.authors || 'Unknown author'}
                </BookDetails>
                <BookDetails>
                  <strong>Price:</strong> {book.price || '$0.00'}
                </BookDetails>
                <StarRating rating={Math.floor(parseFloat(book.rating ?? '0'))} />
                
                <Actions>
                  <Button 
                    variant="primary" 
                    onClick={() => handleAddToCart(book)}
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={() => handleRemoveFromFavorites(book.isbn13)}
                  >
                    Remove
                  </Button>
                </Actions>
              </BookInfo>
            </CardContent>
          </FavoriteCard>
        ))}
      </FavoritesGrid>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

const EmptyCard = styled(Card)`
  text-align: center;
  padding: 60px 40px;
`;

const EmptyMessage = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 24px;
`;

const FavoritesGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FavoriteCard = styled(Card)`
  margin-bottom: 0;
`;

const CardContent = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const BookImage = styled.img`
  width: 100px;
  height: auto;
  border-radius: 4px;
  
  @media (max-width: 768px) {
    width: 80px;
  }
`;

const BookInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BookTitle = styled(Link)`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  line-height: 1.3;
  
  &:hover {
    color: #007bff;
  }
`;

const BookSubtitle = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.4;
`;

const BookDetails = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.4;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export default FavoritesPage;