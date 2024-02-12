import React, { FC, useState, useCallback } from 'react';
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
    const companyId = router.query.company;
   
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
const [errors, setErrors] = useState<AttackLogFormErrors>({});

const handleInputChange = useCallback((field, value) => {
  setFormState(prevState => ({
    ...prevState,
    [field]: value,
  }));
}, []);

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log("送信中");

  const companyId = router.query.company;

  try {
    const postData = {
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
    };

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/attack_logs`, postData);

    if (response.status === 200) {
      console.log(response.data);
      router.push('/dashbord');
    }
  } catch (error) {
    console.error("POST失敗:", error);
  }
};


  return (
    <div className='mt-5 mx-auto'>
      <form onSubmit={handleSubmit}>
        <AttackLogCompany onInputChange={handleInputChange}/>
        <AttackLogKeyPerson onInputChange={handleInputChange}/>
        <AttackLogCallResult onInputChange={handleInputChange}/>
        <Button colorScheme='blue' type="submit" size='lg' ml='32'>登録</Button>
      </form>
    </div>
  );
}