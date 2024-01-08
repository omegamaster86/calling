import * as yup from 'yup';
import { useState, ChangeEvent, FormEvent  } from 'react';
import Link from 'next/link';
import { Input, FormControl, FormLabel, FormErrorMessage, Button } from '@chakra-ui/react';
import { CompanyResisterFormState, CompanyResisterFormErrors } from '../types/interface';

    const RegistrationForm: React.FC = () => {

    const formSchema = yup.object().shape({
        companyName: yup.string().required('記入漏れです'),
        address: yup.string().required('記入漏れです'),
        phoneNumber: yup.string().required('記入漏れです'),
        companyWebsite: yup.string().url('有効なURLを入力してください'),
        department: yup.string(),
        post: yup.string(),
        name: yup.string(),
        email: yup.string().email('有効なメールアドレスを入力してください'),
    });
      
    const [formState, setFormState] = useState<CompanyResisterFormState>({
        companyName: '',
        address: '',
        phoneNumber: '',
        companyWebsite: '',
        department: '',
        post: '',
        name: '',
        email: '',
    });
    const [errors, setErrors] = useState<CompanyResisterFormErrors>({});
    
    const validate = async (values: CompanyResisterFormState): Promise<boolean> => {
        try {
        await formSchema.validate(values, { abortEarly: false });
        setErrors({});
        return true;
        } catch (yupErrors) {
        const newErrors = (yupErrors as yup.ValidationError).inner.reduce((acc: CompanyResisterFormErrors, err: yup.ValidationError) => {
            acc[err.path!] = err.message;
            return acc;
        }, {});
        setErrors(newErrors);
        return false;
        }
    };
      
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState({
        ...formState,
        [e.target.name]: e.target.value,
        });
    };
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const isValid = await validate(formState);
        if (isValid) {
        // フォームの送信ロジックをここに記述
        }
    };
  
    return (
      <form className='mt-5 mx-80' onSubmit={handleSubmit}>
        <FormControl isInvalid={!!errors.companyName} mb={5}>
          <FormLabel htmlFor='companyName'>会社名</FormLabel>
          <Input id='companyName' name='companyName' type='text' onChange={handleChange} />
          <FormErrorMessage>{errors.companyName}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.address} mb={5}>
          <FormLabel htmlFor='address'>住所</FormLabel>
          <Input id='address' name='address' type='text' onChange={handleChange} />
          <FormErrorMessage>{errors.address}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.phoneNumber} mb={5}>
          <FormLabel htmlFor='phoneNumber'>電話番号</FormLabel>
          <Input id='phoneNumber' name='phoneNumber' type='text' onChange={handleChange} />
          <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
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