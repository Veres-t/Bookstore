// pages/FavoritesPage/FavoritesPage.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, StarRating, PageTitle, BackButton } from '../../components';
import { FavoriteButton } from '../../components/FavoriteButton/FavoriteButton';
import { BookCarousel } from '../../components/BookCarousel/BookCarousel';
import { removeFromFavorites, clearFavorites } from '../../store/slices/favoritesSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { getFavoritesItems, getNewReleases } from '../../store/selectors';
import { useSimilarBooks } from '../../hooks/useSimilarBooks'; // ✅ ДОБАВЛЯЕМ ИМПОРТ
import type { RootState } from '../../store';
import type { Book } from '../../types';
import styled from 'styled-components';

export const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => getFavoritesItems(state));
  const newReleases = useSelector((state: RootState) => getNewReleases(state));

  // ✅ ЗАМЕНЯЕМ СЛОЖНУЮ ЛОГИКУ НА ХУК
  const similarBooks = useSimilarBooks({
    sourceBooks: favorites, // Передаем весь список избранного
    allBooks: newReleases,
    maxResults: 6
  });

  const handleRemoveFromFavorites = (book: Book) => {
    dispatch(removeFromFavorites({ isbn13: book.isbn13 }));
  };

  const handleAddToCart = (book: Book) => {
    dispatch(addToCart({ book }));
  };

  const handleClearFavorites = () => {
    dispatch(clearFavorites());
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/250x300/007bff/ffffff?text=No+Image';
  };

  if (favorites.length === 0) {
    return (
      <Container>
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
      <BackButton />
      
      <HeaderRow>
        <PageTitle>{`Favorites (${favorites.length})`}</PageTitle>
        <Button variant="secondary" onClick={handleClearFavorites}>
          Clear All
        </Button>
      </HeaderRow>

      <FavoritesSection>
        {favorites.map(book => (
          <FavoriteCard key={book.isbn13} padding="medium">
            <CardContent>
              <BookImageContainer>
                <BookImage 
                  src={book.image || 'https://via.placeholder.com/250x300/007bff/ffffff?text=No+Image'} 
                  alt={book.title || 'Book cover'}
                  onError={handleImageError}
                />
              </BookImageContainer>
              
              <BookInfoSection>
                <BookTitle to={`/books/${book.isbn13}`}>
                  {book.title || 'Untitled Book'}
                </BookTitle>
                <BookSubtitle>{book.subtitle || ''}</BookSubtitle>
                
                <BookDetails>
                  <strong>Authors:</strong> {book.authors || 'Unknown author'}
                </BookDetails>
                <BookDetails>
                  <strong>Publisher:</strong> {book.publisher || 'Unknown publisher'}
                </BookDetails>
                
                <RatingAndPrice>
                  <ItemPrice>{book.price || '$0.00'}</ItemPrice>
                  <StarRating rating={Math.floor(parseFloat(book.rating ?? '0'))} />
                </RatingAndPrice>
                
                <Actions>
                  <Button 
                    variant="primary" 
                    onClick={() => handleAddToCart(book)}
                  >
                    Add to Cart
                  </Button>
                </Actions>
              </BookInfoSection>
              
              <FavoriteButtonContainer>
                <FavoriteButton 
                  isFavorite={true}
                  onClick={() => handleRemoveFromFavorites(book)}
                />
              </FavoriteButtonContainer>
            </CardContent>
          </FavoriteCard>
        ))}
      </FavoritesSection>

      {/* Similar Books Section */}
      {similarBooks.length > 0 && (
        <SimilarSection>
          <BookCarousel 
            title="SIMILAR BOOKS YOU MIGHT LIKE" 
            books={similarBooks} 
          />
        </SimilarSection>
      )}
    </Container>
  );
};

// Styled components остаются без изменений
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
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

const FavoritesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const FavoriteCard = styled(Card)`
  margin-bottom: 0;
  padding: 24px;
  width: 100%;
  position: relative;
`;

const CardContent = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr auto;
  gap: 32px;
  align-items: start;
  
  @media (max-width: 768px) {
    grid-template-columns: 200px 1fr;
    gap: 24px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
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
  
  @media (max-width: 768px) {
    width: 200px;
    height: 250px;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    height: 300px;
  }
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

const BookDetails = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.4;
`;

const RatingAndPrice = styled.div`
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

const Actions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 20px;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const FavoriteButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    position: absolute;
    top: 16px;
    right: 16px;
  }
  
  @media (max-width: 480px) {
    position: static;
    justify-content: flex-end;
    margin-top: 16px;
  }
`;

const SimilarSection = styled.section`
  margin-top: 60px;
  border-top: 1px solid #e1e5e9;
  padding-top: 40px;
`;

export default FavoritesPage;