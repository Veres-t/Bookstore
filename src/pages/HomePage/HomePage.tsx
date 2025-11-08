// pages/HomePage/HomePage.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '../../components';
import { BookCardContainer } from '../../containers/BookCardContainer';
import { fetchNewReleasesStart } from '../../store/slices/booksSlice';
import { getNewReleases, getBooksLoading } from '../../store/selectors';
import type { RootState } from '../../store';
import styled from 'styled-components';

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const newReleases = useSelector((state: RootState) => getNewReleases(state));
  const loading = useSelector((state: RootState) => getBooksLoading(state));
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState('');

  useEffect(() => {
    dispatch(fetchNewReleasesStart());
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log('Changing to page:', page);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed with email:', email);
    setEmail('');
  };

  if (loading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Container>
      <PageTitle>NEW RELEASES BOOKS</PageTitle>
      
      <BooksGrid>
        {newReleases.slice(0, 12).map(book => (
          <BookCardContainer
            key={book.isbn13}
            book={book}
            variant="grid"
            showActions={false}
          />
        ))}
      </BooksGrid>

      {/* Остальной код без изменений... */}
      <Divider />

      <Pagination
        currentPage={currentPage}
        totalPages={6}
        onPageChange={handlePageChange}
      />

      <NewsletterSection>
        <NewsletterContent>
          <NewsletterTitle>SUBSCRIBE TO NEWSLETTER</NewsletterTitle>
          <NewsletterText>
            Be the first to know about new IT books, upcoming releases, exclusive offers and more.
          </NewsletterText>
          <SubscribeForm onSubmit={handleSubscribe}>
            <EmailInput
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <SubscribeButton type="submit">
              SUBSCRIBE
            </SubscribeButton>
          </SubscribeForm>
        </NewsletterContent>
      </NewsletterSection>
    </Container>
  );
};


// Styled components
const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 32px;
  text-align: left;
  
  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 24px;
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
`;

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 40px;
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: #e1e5e9;
  margin: 40px 0;
  width: 100%;
`;

// Newsletter стили - ОБНОВЛЕННЫЕ
const NewsletterSection = styled.section`
  background: #ffe6e6;
  padding: 40px;
  margin: 60px 0 40px 0;
  border-radius: 0;
  
  @media (max-width: 768px) {
    padding: 30px 20px;
    margin: 40px 0 30px 0;
  }
`;

const NewsletterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const NewsletterTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const NewsletterText = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const SubscribeForm = styled.form`
  display: flex;
  width: 100%;
  margin-top: 16px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const EmailInput = styled.input`
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-right: none;
  border-radius: 4px 0 0 4px;
  font-size: 14px;
  flex: 1;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
  
  @media (max-width: 480px) {
    border-right: 1px solid #ddd;
    border-radius: 4px;
  }
`;

const SubscribeButton = styled.button`
  padding: 12px 32px;
  background: #000;
  color: white;
  border: 1px solid #000;
  border-radius: 0 4px 4px 0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  min-width: 140px;
  
  &:hover {
    background: #333;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    border-radius: 4px;
    min-width: auto;
  }
`;

export default HomePage;