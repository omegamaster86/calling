import { Flex, Box, Spacer } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';

export const Header = () => {

    const fetcher = (url: string) => axios.get(url).then(res => res.data);
    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/users`, fetcher);
    if (error) {
      return <div>ユーザーデータの取得に失敗しました。</div>;
    }

    if (!data) {
      return <div>ローディング中...</div>;
    }

    const userName = data.name;

    // useEffect(() => {
    //     axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`
    //     )
    //     .then(response => {
    //       setUserName(response.data[0].name);
    //     })
    //     .catch(error => console.error('Error fetching user data:', error));
    // }, []);

  return (
    <Flex
      height="70px" 
      alignItems="center" 
      bgGradient="linear(to-r, blue.700, blue.500)" 
    >
      <Box color="white" fontSize="xl" pl={20}>
        Header
      </Box>
      <Spacer /> 
      <Box color="white" fontSize="xl" pr={20}>
        {userName}
      </Box>
    </Flex>
  );
}

