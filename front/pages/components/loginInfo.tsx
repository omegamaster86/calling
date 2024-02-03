import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const LoginInfo = () => {
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('No email provided'),
    password: Yup.string()
      .required('No password provided')
      .min(3, 'Password should be min 3 chars'),
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        email: data.email,
        password: data.password,
      }, {
        withCredentials: true // セッションCookieをリクエストに含める
      });
      router.push('/dashbord');
      // console.log(response.data);
      console.log(response);
      // if (response.data.logged_in) {
      //   console.log("できてるやん");
      //   router.push('/dashbord');
      // } else {
      //   console.log("失敗");
      //   setFormErrors({ server: "認証に失敗しました。" });
      // }
    } catch (error) {
      console.log("とても失敗");
      const errorMessage = error.response && error.response.data && error.response.data.error ? error.response.data.error : '認証に失敗しました。';
      setFormErrors({ server: errorMessage });
    }
  };

  return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <FormControl isInvalid={!!errors.email}>
        <FormLabel htmlFor="email"></FormLabel>
           <Input id="email" placeholder='Email' {...register('email')} />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password"></FormLabel>
          <InputGroup>
          <Input
              id="password"
              placeholder='Password'
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
          />
          <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
          </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <button type="submit" className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md py-3 text-gray-50 text-lg
          hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-blue-500 hover:text-gray-700">
          Login
      </button>
  </form>
  )
}
