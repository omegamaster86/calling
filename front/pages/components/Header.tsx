import { Flex, Box, Spacer } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export const Header = () => {
  const [userName, setUserName] = useState('');
  const { data: session, status  } = useSession();

  // useEffect(() => {
  //   const token = localStorage.getItem('userToken'); // 認証トークンをローカルストレージから取得
  //   axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
  //     headers: {
  //       Authorization: `Bearer ${token}` // ヘッダーに認証トークンを設定
  //     }
  //   })
  //   .then(response => {
  //     console.log(response.data);
  //     // レスポンスからユーザー名を取得して状態にセット
  //     setUserName(response.data.name);
  //   })
  //   .catch(error => console.error('Error fetching user data:', error));
  // }, []);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
    .then(response => {
        console.log(session);
        if (session) {
          // ログインしているユーザーに対応するデータを見つける
          const loggedInUser = response.data.find(name => email === response.data.email);
          if (loggedInUser) {
            setUserName(loggedInUser.name); // ユーザー名を設定
          }
        }
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, [session]);

  // useEffect(() => {
  //   axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
  //     .then(response => {
  //       console.log(session);
  //       if (session) {
  //         // ここで、session変数からログイン中のユーザーのメールアドレスを取得する
  //         const loggedInUserEmail = session.email; // session変数にemailが含まれていると仮定
  
  //         // ログインしているユーザーに対応するデータを見つける
  //         const loggedInUser = response.data.find(user => user.email === loggedInUserEmail);
  //         if (loggedInUser) {
  //           setUserName(loggedInUser.name); // ユーザー名を設定
  //         }
  //       }
  //     })
  //     .catch(error => console.error('Error fetching user data:', error));
  // }, [session]);
  

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`); // APIエンドポイントを指定
  //       setUserName(response.data.name); // レスポンスからユーザー名を取得
  //     } catch (error) {
  //       console.error('ユーザー情報の取得に失敗しました', error);
  //     }
  //   };
  //   fetchUserData();
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
         {userName ? <p>{userName}</p> : <p>ユーザー情報を取得中...</p>}
      </Box>
    </Flex>
  );
}
