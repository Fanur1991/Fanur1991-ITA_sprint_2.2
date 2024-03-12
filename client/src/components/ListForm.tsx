import { BookType } from '../App';
import BookForm from './BookForm';
import { List, Typography, Spin } from 'antd';

interface IBookList {
  books: BookType[];
  searchQuery: string;
  loading: boolean;
}

const ListForm: React.FC<IBookList> = ({ books, searchQuery, loading }) => {
  return (
    <div>
      <List
        loading={loading}
        header={
          <Typography.Title style={{ margin: 0 }} level={4}>
            Book List
          </Typography.Title>
        }
        bordered
        dataSource={books}
        renderItem={(book) => (
          <List.Item
            children={<BookForm book={book} searchQuery={searchQuery} />}
          />
        )}
      />
    </div>
  );
};

export default ListForm;
