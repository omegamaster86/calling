import { Flex, Box, Spacer } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const Header = () => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`
        )
        .then(response => {
          setUserName(response.data[0].name);
        })
        .catch(error => console.error('Error fetching user data:', error));
    }, []);

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

