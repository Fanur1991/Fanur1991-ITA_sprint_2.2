import { useEffect, useState } from 'react';
import { Flex, Form, Typography } from 'antd';
import InputForm from './components/InputForm';
import ListForm from './components/ListForm';
import { throttle } from './utils/throttle';

import './App.css';

const { Title } = Typography;

export type BookType = {
  title: string;
  author: string;
  year: number;
};

const App: React.FC = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [requestCount, setRequestCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api', {
        method: 'GET',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();

      const books: BookType[] = data.books;

      setBooks(books);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFilteredBooks = async (searchQuery: string) => {
    try {
      console.log(searchQuery);

      setLoading(true);
      const response = await fetch(`/api/books?search=${searchQuery}`, {
        method: 'GET',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();

      const books: BookType[] = data.books;

      console.log(books);

      setLoading(false);
      setBooks(books);
      setSearchQuery(searchQuery);
      setRequestCount((prevCount) => (searchQuery ? ++prevCount : 0));
    } catch (error) {
      console.log(error);
    }
  };

  const filterBooksWithoutThrottle = (searchQuery: string) => {
    console.log('filterBooksWithoutThrottle');
    fetchFilteredBooks(searchQuery);
  };

  const filterBooksWithThrottle = throttle((searchQuery: string) => {
    console.log('filterBooksWithThrottle');
    fetchFilteredBooks(searchQuery);
  });

  return (
    <div className="App">
      <Flex style={{ marginTop: 50 }} align="center" vertical>
        <Form>
          <Form.Item>
            <Title style={{ color: '#595959' }} color="#ABACA5">
              E-Library
            </Title>
          </Form.Item>
          <Form.Item>
            <InputForm
              filterBooksWithoutThrottle={filterBooksWithoutThrottle}
              filterBooksWithThrottle={filterBooksWithThrottle}
              requestCount={requestCount}
            />
          </Form.Item>
          <Form.Item>
            <ListForm
              books={books}
              searchQuery={searchQuery}
              loading={loading}
            />
          </Form.Item>
        </Form>
      </Flex>
    </div>
  );
};

export default App;
