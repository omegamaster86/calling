import React, { useEffect, useState } from 'react';
import { Flex, Box, Spacer } from '@chakra-ui/react';

export const Header = () => {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // ローカルストレージからユーザー名を取得
    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name);
    } else {
      setError('ユーザーデータの取得に失敗しました。');
    }
  }, []);

  return (
    <Flex
      height="70px" 
      alignItems="center" 
      bgGradient="linear(to-r, blue.700, blue.500)"
    >
      <Box color="white" fontSize="xl" pl={20}>
        Calling
      </Box>
      <Spacer />
      <Box color="white" fontSize="xl" pr={20}>
        {userName ? userName : 'ローディング中...'}
      </Box>
    </Flex>
  );
};
