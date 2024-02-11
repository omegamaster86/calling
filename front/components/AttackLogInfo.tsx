import React, { FC, useState, ChangeEvent } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/react';
import { AttackLogFormState, AttackLogFormErrors } from '../types/interface';
import { AttackLogCompany } from '../components/AttackLog/AttackLogCompany';
import { AttackLogKeyPerson } from '../components/AttackLog/AttackLogKeyPerson';
import { AttackLogCallResult } from '../components/AttackLog/AttackLogCallResult';

interface AttackLogProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const AttackLogInfo: FC<AttackLogProps> = () => {
    const router = useRouter();
    const { company } = router.query;

    const formSchema = yup.object().shape({
      note: yup.string().required('記入漏れです')
      .min(1, '内容は1文字以上50文字以下で入力してください')
      .max(200, '内容は1文字以上200文字以下で入力してください'),
      companyName: yup.string().required('記入漏れです')
      .min(1, '内容は1文字以上50文字以下で入力してください')
      .max(50, '内容は1文字以上50文字以下で入力してください'),
      address: yup.string().required('記入漏れです')
      .min(1, '内容は1文字以上50文字以下で入力してください')
      .max(50, '内容は1文字以上50文字以下で入力してください'),
      telephoneNumber: yup.string().required('記入漏れです')
      .matches(/^(\d{10,11}|\d{2,4}-\d{2,4}-\d{4})$/, '有効な形式で入力してください'), 
  });
   
  const [formState, setFormState] = useState<AttackLogFormState>({
    companyName: null,
    address: null,
    telephoneNumber: null,
    companyWebsite: null,
    department: null,
    post: null,
    name: null,
    number: null,
    email: null,
    note: null,
    callingDay: null,
    callingStart: null,
    callResult: null,
    nextCallDay: null,
    salseman: null,
    callContent: null,
});
const [errors, setErrors] = useState<AttackLogFormErrors>({});

// 子コンポーネントからの入力値を処理するためのハンドラー
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormState(prevState => ({
    ...prevState,
    [name]: value,
  }));
};

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log("送信中");
  try {
    await formSchema.validate(formState, { abortEarly: false });
     const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/attack_logs`, {
      company: {
        company_name: formState.companyName,
        address: formState.address,
        telephone_number: formState.telephoneNumber,
        website: formState.companyWebsite ,
      },
      key_person: {
        department: formState.department,
        post: formState.post,
        name: formState.name,
        email: formState.email,
        number: formState.number,
        note: formState.note,
      },
      attack_log: {
        callingDay: formState.callingDay,
        callingStart: formState.callingStart,
        callResult: formState.callResult,
        nextCallDay: formState.nextCallDay,
        salseman: formState.salseman,
        callContent: formState.callContent,
      },
    });
    console.log("非同期処理成功");
    if (response.status === 200) {
      router.push('/dashbord');
    } 
  }  catch (error) {
    if (error instanceof yup.ValidationError) {
      // バリデーションエラーを処理
      const newErrors = error.inner.reduce((acc, err) => {
        if (err.path) acc[err.path] = err.message;
        return acc;
      }, {});
      setErrors(newErrors);
    } else if (axios.isAxiosError(error)) {
      // AxiosによるHTTPエラーを処理
      console.error("Axios error:", error.response);
    } else {
      // それ以外のエラーを処理
      console.error("Unexpected error:", error);
    }
  }
};

  return (
    <div className='mt-5 mx-auto'>
      <form onSubmit={handleSubmit}>
        <AttackLogCompany handleNameInputChange={handleInputChange}/>
        <AttackLogKeyPerson/>
        <AttackLogCallResult/>
        <Button colorScheme='blue' type="submit" size='lg' ml='32'>登録</Button>
      </form>
    </div>
  );
}