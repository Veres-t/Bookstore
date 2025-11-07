// pages/HomePage/HomePage.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Heading, Button, Card } from '../../components';
import { fetchNewReleasesStart } from '../../store/slices/booksSlice';
import { getNewReleases, getBooksLoading } from '../../store/selectors/booksSelectors';
import type { RootState } from '../../store';

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const newReleases = useSelector((state: RootState) => getNewReleases(state));
  const loading = useSelector((state: RootState) => getBooksLoading(state));

  useEffect(() => {
    dispatch(fetchNewReleasesStart());
  }, [dispatch]);

  return (
    <div>
      <Heading level={1}>New Releases</Heading>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {newReleases.map(book => (
            <Card key={book.isbn13} padding="medium">
              <h3>{book.title}</h3>
              <p>{book.subtitle}</p>
              <p>Price: {book.price}</p>
              <Button variant="primary">View Details</Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};