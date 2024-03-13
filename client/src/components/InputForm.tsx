import { useState } from 'react';
import { Flex, Input, Switch, Typography } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

interface InputFormProps {
  filterBooksWithoutThrottle: (searchQuery: string) => void;
  filterBooksWithThrottle: (searchQuery: string) => void;
  requestCount: number;
}

const InputForm: React.FC<InputFormProps> = ({
  filterBooksWithoutThrottle,
  filterBooksWithThrottle,
  requestCount,
}) => {
  const [searchQueryWithoutThrottle, setSearchQueryWithoutThrottle] =
    useState<string>(''); // Estado del texto de entrada sin throttle
  const [searchQueryWithThrottle, setSearchQueryWithThrottle] =
    useState<string>(''); // Estado del texto de entrada con throttle
  const [turnOnThrottle, setTurnOnThrottle] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = event.target.value;

    if (turnOnThrottle) {
      setSearchQueryWithThrottle(newValue);
      filterBooksWithThrottle(newValue);
    } else {
      setSearchQueryWithoutThrottle(newValue);
      filterBooksWithoutThrottle(newValue);
    }
  };

  return (
    <Flex justify="center" align="start" gap="large">
      <Flex justify="center" align="center" gap="middle" vertical>
        <Input
          value={searchQueryWithThrottle || searchQueryWithoutThrottle}
          onChange={handleInputChange}
          style={{ width: 500 }}
          size="large"
          placeholder="Filter by title..."
          allowClear
          autoFocus
        />
        <span style={{ fontSize: '16px' }}>
          Number of requests per server:{' '}
          <span style={{ fontWeight: 600, fontSize: 24 }}>{requestCount}</span>
        </span>
      </Flex>
      <Flex
        style={{
          border: '1px solid #8e8e8e',
          borderRadius: '15px',
          padding: 10,
        }}
        gap="middle"
        vertical
      >
        <Flex gap="small">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={turnOnThrottle}
            onChange={setTurnOnThrottle}
          ></Switch>
          <Typography.Text>
            Turn <span style={{ fontWeight: 500 }}>throttle</span> on
          </Typography.Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default InputForm;
