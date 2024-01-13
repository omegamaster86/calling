import * as yup from 'yup';
import { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import { Input, FormControl, FormLabel, FormErrorMessage, Button } from '@chakra-ui/react';
import { CompanyResisterFormState, CompanyResisterFormErrors } from '../types/interface';
import axios from 'axios';

    const RegistrationForm: React.FC = () => {

    const formSchema = yup.object().shape({
        companyName: yup.string().required('記入漏れです'),
        address: yup.string().required('記入漏れです'),
        telephoneNumber: yup.string().required('記入漏れです'),
        companyWebsite: yup.string().url('有効なURLを入力してください'),
    });
      
    const [formState, setFormState] = useState<CompanyResisterFormState>({
        companyName: '',
        address: '',
        telephoneNumber: '',
        companyWebsite: '',
    });
    const [errors, setErrors] = useState<CompanyResisterFormErrors>({});
      
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState({
        ...formState,
        [e.target.name]: e.target.value,
        });
    };
    
    const handleSubmit = async () => {
        try {
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/companies`,{
            company: {
              company_name: formState.companyName,
              address: formState.address,
              telephone_number: formState.telephoneNumber,
              website: formState.companyWebsite 
            }
          });
        } catch (error) {
          console.error(error);
        }
    };
  
    return (
      <form className='mt-16 mx-80' onSubmit={handleSubmit}>
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

        <FormControl isInvalid={!!errors.telephoneNumber} mb={5}>
          <FormLabel htmlFor='telephoneNumber'>電話番号</FormLabel>
          <Input id='telephoneNumber' name='telephoneNumber' type='text' onChange={handleChange} />
          <FormErrorMessage>{errors.telephoneNumber}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.companyWebsite} mb={5}>
          <FormLabel htmlFor='companyWebsite'>会社サイト</FormLabel>
          <Input id='companyWebsite' name='companyWebsite' type='text' onChange={handleChange} />
        </FormControl>

        <Button mt={4} colorScheme='blue' type="submit">登録</Button>
        <Button mt={4} ml={6} colorScheme='blue' type="submit">
           <Link href={'/dashbord'}>ダッシュボード</Link>
           <Link href={'/keypersonresister'}>キーパーソンの登録へ</Link>
        </Button>
      </form>
    );
  };

  export default RegistrationForm;