import * as yup from 'yup';
import React, { FC, useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Button, Stack, Alert, AlertIcon } from '@chakra-ui/react';
import { AttackLogFormState } from '../types/interface';
import { AttackLogCompany } from '../components/AttackLog/AttackLogCompany';
import { AttackLogKeyPerson } from '../components/AttackLog/AttackLogKeyPerson';
import { AttackLogCallResult } from './AttackLog/AttackLogCallResult';
import { AttackLog } from '@/types/interface';

interface AttackLogProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

type OnInputChange = (field: keyof AttackLog, value: string) => void;

export const AttackLogInfo: FC<AttackLogProps> = () => {
  const router = useRouter();
  const companyId = router.query.company;
  const [isPostSuccess, setIsPostSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const formSchema = yup.object().shape({
    companyName: yup.string().required('記入漏れです')
    .min(1, '内容は1文字以上50文字以下で入力してください')
    .max(50, '内容は1文字以上50文字以下で入力してください'),
    address: yup.string().required('記入漏れです')
    .min(1, '内容は1文字以上50文字以下で入力してください')
    .max(50, '内容は1文字以上50文字以下で入力してください'),
    telephoneNumber: yup.string().required('記入漏れです')
    .matches(/^(\d{10,11}|\d{2,4}-\d{2,4}-\d{4})$/, '有効な形式で入力してください'), // 電話番号の形式を検証
    callingStart: yup.string().required('記入漏れです'),
    callResult: yup.string().required('記入漏れです'),
    salesman: yup.string().required('記入漏れです'),
    callContent: yup.string().required('記入漏れです'),
});
   
  const [formState, setFormState] = useState<AttackLogFormState>({
    companyId: companyId as string,
    companyName: "",
    address: "",
    telephoneNumber: "",
    companyWebsite: "",
    department: "",
    post: "",
    name: "",
    number: "",
    email: "",
    note: "",
    callingStart: "",
    callResult: "",
    nextCallDay: "",
    salesman: "",
    callContent: "",
});

  const handleInputChange: OnInputChange = useCallback((field, value) => {
    setFormState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const companyId = router.query.company;

  try {
    await formSchema.validate(formState, { abortEarly: false });
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/attack_logs`,  {
      company_id: companyId, // ここで `company_id` としてクエリパラメータの値を使用
      company: {
        company_name: formState.companyName,
        address: formState.address,
        telephone_number: formState.telephoneNumber,
        website: formState.companyWebsite,
      },
      key_person: {
        department: formState.department,
        post: formState.post,
        name: formState.name,
        email: formState.email,
        telephone_number: formState.number,
        note: formState.note,
      },
      attack_log: {
        calling_start: formState.callingStart,
        call_result: formState.callResult,
        next_call_day: formState.nextCallDay,
        salesman: formState.salesman,
        call_content: formState.callContent,
      },
    });

    if (response.status === 201) {
      setIsPostSuccess(true);
      // TODO: リダイレクトする方法で検討
      router.reload();
    }
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors = error.inner.reduce((acc, curr) => {
        acc[curr.path] = curr.message;
        return acc;
      }, {});
      setFormErrors(errors);
    } else {
      console.error("Validation failed", error);
    }
  }};

  return (
    <div className='mt-5 mx-auto'>
      <form onSubmit={handleSubmit}>
        <AttackLogCompany onInputChange={handleInputChange} errors={formErrors}/>
        <AttackLogKeyPerson onInputChange={handleInputChange} errors={formErrors}/>
        <AttackLogCallResult onInputChange={handleInputChange} errors={formErrors}/>
        <div className=' pl-24 w-64 pb-4'>
          {isPostSuccess && (
            <Stack spacing={3}>
              <Alert status='success'>
                <AlertIcon />
                登録完了!
              </Alert>
            </Stack>
          )}
        </div>
        <Button colorScheme='blue' type="submit" size='lg' ml='32' >登録</Button>
      </form>
    </div>
  );
};