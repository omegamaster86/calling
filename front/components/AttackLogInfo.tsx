import React, { FC, useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Button, Stack, Alert, AlertIcon } from '@chakra-ui/react';
import { AttackLogFormState, AttackLogFormErrors } from '../types/interface';
import { AttackLogCompany } from '../components/AttackLog/AttackLogCompany';
import { AttackLogKeyPerson } from '../components/AttackLog/AttackLogKeyPerson';
import { AttackLogCallResult } from './AttackLog/AttackLogCallResult';

interface AttackLogProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const AttackLogInfo: FC<AttackLogProps> = () => {
    const router = useRouter();
    const companyId = router.query.company;
    const [isPostSuccess, setIsPostSuccess] = useState(false);
   
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
    callingDay: "",
    callingStart: "",
    callResult: "",
    nextCallDay: "",
    salseman: "",
    callContent: "",
});

const handleInputChange = useCallback((field, value) => {
  setFormState(prevState => ({
    ...prevState,
    [field]: value,
  }));
}, []);

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const companyId = router.query.company;

  try {
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
        calling_day: formState.callingDay,
        calling_start: formState.callingStart,
        call_result: formState.callResult,
        next_call_day: formState.nextCallDay,
        salseman: formState.salseman,
        call_content: formState.callContent,
      },
    });

    if (response.status === 201) {
      setIsPostSuccess(true);
    }
  } catch (error) {
    alert("POST失敗:");
  }
};
  // TODO: リダイレクトする方法で検討
  const handleReload = () => {
    router.reload();
  };

  return (
    <div className='mt-5 mx-auto'>
      <form onSubmit={handleSubmit}>
        <AttackLogCompany onInputChange={handleInputChange}/>
        <AttackLogKeyPerson onInputChange={handleInputChange}/>
        <AttackLogCallResult onInputChange={handleInputChange}/>
        <div className=' pl-8'>
          {isPostSuccess && (
            <Stack spacing={3}>
              <Alert status='success'>
                <AlertIcon />
                Data uploaded to the server. Fire on!
              </Alert>
            </Stack>
          )}
        </div>
        <Button colorScheme='blue' type="submit" size='lg' ml='32' onClick={handleReload}>登録</Button>
      </form>
    </div>
  );
}