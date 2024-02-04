import * as yup from 'yup';
import { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import { Input, FormControl, FormLabel, FormErrorMessage, Button } from '@chakra-ui/react';
import { CompanyResisterFormState, CompanyResisterFormErrors } from '../types/interface';
import axios from 'axios';
import { useRouter } from 'next/router';

    const RegistrationForm: React.FC = () => {
      const router = useRouter();
    // TODO: バリデーションの修正
    const formSchema = yup.object().shape({
        companyName: yup.string().required('記入漏れです')
        .min(1, '内容は1文字以上50文字以下で入力してください')
        .max(50, '内容は1文字以上50文字以下で入力してください'),
        industry: yup.string().required('記入漏れです')
        .min(1, '内容は1文字以上50文字以下で入力してください')
        .max(50, '内容は1文字以上50文字以下で入力してください'),
        address: yup.string().required('記入漏れです')
        .min(1, '内容は1文字以上50文字以下で入力してください')
        .max(50, '内容は1文字以上50文字以下で入力してください'),
        telephoneNumber: yup.string().required('記入漏れです')
        .matches(/^(\d{10,11}|\d{2,4}-\d{2,4}-\d{4})$/, '有効な形式で入力してください'), // 電話番号の形式を検証
    });
      
    const [formState, setFormState] = useState<CompanyResisterFormState>({
        companyName: null,
        industry: null,
        address: null,
        telephoneNumber: null,
        companyWebsite: null,
        department: null,
        post: null,
        name: null,
        email: null,
    });
    const [errors, setErrors] = useState<CompanyResisterFormErrors>({});
      
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState({
        ...formState,
        [e.target.name]: e.target.value,
        });
    };
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        await formSchema.validate(formState, { abortEarly: false });
         const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/companies`, {
          company: {
            company_name: formState.companyName,
            industry: formState.industry,
            address: formState.address,
            telephone_number: formState.telephoneNumber,
            website: formState.companyWebsite ,
          },
          key_person: {
            department: formState.department,
            post: formState.post,
            name: formState.name,
            email: formState.email
          }
        });
        if (response.status === 200) {
          router.push('/dashbord');
        } 
      } catch (validationError) {
        if (validationError instanceof yup.ValidationError) {
          // バリデーションエラーを処理
          const newErrors = validationError.inner.reduce<{ [key: string]: string }>((acc, error) => {
            if (error.path) {
              acc[error.path] = error.message;
            }
            return acc;
          }, {});
          setErrors(newErrors);
        } else {
          // その他のエラーを処理
          console.error("失敗", validationError);
        }
      }
    };
    
    return (
      <form className='mt-16 mx-80' onSubmit={handleSubmit}>
        <FormControl isInvalid={!!errors.companyName} mb={5}>
          <FormLabel htmlFor='companyName'>会社名</FormLabel>
          <Input id='companyName' name='companyName' type='text' onChange={handleChange} />
          <FormErrorMessage>{errors.companyName}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.industry} mb={5}>
          <FormLabel htmlFor='industry'>業界</FormLabel>
          <Input id='industry' name='industry' type='text' onChange={handleChange} />
          <FormErrorMessage>{errors.industry}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.address} mb={5}>
          <FormLabel htmlFor='address'>住所</FormLabel>
          <Input id='address' name='address' type='text' onChange={handleChange} />
          <FormErrorMessage>{errors.address}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.telephoneNumber} mb={5}>
          <FormLabel htmlFor='telephoneNumber'>電話番号</FormLabel>
          <Input id='telephoneNumber' name='telephoneNumber' type='text' onChange={handleChange} />
          <FormErrorMessage>{errors.telephoneNumber}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.companyWebsite} mb={5}>
          <FormLabel htmlFor='companyWebsite'>会社サイト</FormLabel>
          <Input id='companyWebsite' name='companyWebsite' type='text' onChange={handleChange} />
        </FormControl>

         <FormControl isInvalid={!!errors.department} mb={5}>
           <FormLabel htmlFor='department'>部署</FormLabel>
           <Input id='department' name='department' type='text' onChange={handleChange} />
         </FormControl>

         <FormControl isInvalid={!!errors.companyWebsite} mb={5}>
           <FormLabel htmlFor='post'>役職</FormLabel>
           <Input id='post' name='post' type='text' onChange={handleChange} />
         </FormControl>

         <FormControl isInvalid={!!errors.name} mb={5}>
           <FormLabel htmlFor='name'>氏名</FormLabel>
           <Input id='name' name='name' type='text' onChange={handleChange} />
         </FormControl>

         <FormControl isInvalid={!!errors.email} mb={5}>
           <FormLabel htmlFor='email'>メールアドレス</FormLabel>
           <Input id='email' name='email' type='text' onChange={handleChange} />
         </FormControl>

        <Button mt={4} colorScheme='blue' type="submit">登録</Button>
        <Button mt={4} ml={6} colorScheme='blue' type="submit">
           <Link href={'/dashbord'}>ダッシュボード</Link>
        </Button>
      </form>
    );
  };

  export default RegistrationForm;