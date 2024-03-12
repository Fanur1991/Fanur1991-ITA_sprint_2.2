import { Typography, Flex } from 'antd';
import { BookType } from '../App';

interface IBook {
  book: BookType;
  searchQuery: string;
}

const BookForm: React.FC<IBook> = ({ book, searchQuery }) => {
  // Aquí resaltamos los símbolos coincidentes en amarillo
  const highlightMatch = (text: string, filter: string): React.ReactNode => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, 'gi');

    return text.split(regex).map((substring, index) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={index} style={{ color: 'yellow', fontWeight: 'bold' }}>
            {substring}
          </span>
        );
      }
      return substring;
    });
  };

  return (
    <Flex justify="center" gap="small" vertical>
      <Flex align="center" justify="flex-start" gap="middle">
        <Typography.Text type="secondary">Title:</Typography.Text>
        <Typography.Title style={{ margin: 0 }} level={3}>
          {highlightMatch(book.title, searchQuery)}
        </Typography.Title>
      </Flex>
      <Flex align="center" justify="flex-start" gap="middle">
        <Typography.Text type="secondary">Author:</Typography.Text>
        <Typography.Text>{book.author}</Typography.Text>
        <Typography.Text type="secondary">Year:</Typography.Text>
        <Typography.Text>{book.year}</Typography.Text>
      </Flex>
    </Flex>
  );
};

export default BookForm;
