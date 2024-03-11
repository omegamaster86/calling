import React, { FC, useEffect, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { Company, KeyPerson } from '@/types/interface';

interface AttackLogKeyPersonProps {
  onInputChange: (field: string, value: string) => void;
  errors: Record<string, string>; 
}

interface InputFieldProps {
    label: string;
    name: string;
    id: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

const InputField: FC<InputFieldProps> = ({  label, name, id, type = "text", value = "", onChange  }) => {
    return (
      <div>
        <label className="text-sm font-semibold leading-6 text-sky-400">{label}</label>
        <div className="w-64 border-b-2">
          <input 
            type={type}
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            className="outline-none block rounded-md px-3.5 pt-2 text-gray-900 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    );
};

export const AttackLogKeyPerson: FC<AttackLogKeyPersonProps> = ({ onInputChange }) => {
    const [companies, setCompanies] = useState([]);
    const router = useRouter();
    const company = router.query.company as string | string[] | undefined;
    const [department, setDepartment] = useState('');
    const [post, setPost] = useState('');
    const [name, setName] = useState('');
    const [telephoneNumber, setTelephoneNumber] = useState('');
    const [email, setEmail] = useState(''); 
    const [note, setNote] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          if (!company) return;
          try {
            const resCompanies = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies`);
            const companiesData = await resCompanies.json();
    
            const resKeyPersons = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/key_persons`);
            const keyPersonsData = await resKeyPersons.json();
    
            // companiesとkeyPersonsを結合
            const mergedData = companiesData.map((company: Company) => {
              return {
                ...company,
                keyPerson: keyPersonsData.find((kp:KeyPerson) => kp.company_id?.toString() === company.id.toString())
              };
            });
    
            setCompanies(mergedData);

            const selectedCompany = mergedData.find((comp: Company) => comp.id.toString() === company); // companyクエリと一致するIDを持つ会社を探す
            if (selectedCompany) {
                setDepartment(selectedCompany.keyPerson.department); // 見つかったらその名前を設定
                setPost(selectedCompany.keyPerson.post); 
                setName(selectedCompany.keyPerson.name);
                setTelephoneNumber(selectedCompany.keyPerson.telephone_number);
                setEmail(selectedCompany.keyPerson.email);
                setNote(selectedCompany.keyPerson.note);

                onInputChange('department', selectedCompany.keyPerson.department); // 見つかったらその名前を設定
                onInputChange('post', selectedCompany.keyPerson.post); 
                onInputChange('name', selectedCompany.keyPerson.name);
                onInputChange('number', selectedCompany.keyPerson.telephone_number);
                onInputChange('email', selectedCompany.keyPerson.email);
                onInputChange('note', selectedCompany.keyPerson.note);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } 
        };
        fetchData();
      }, [company]);

      const handleDepartmentInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDepartment(e.target.value);
        onInputChange('department', e.target.value);
      };
      const handlePostInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPost(e.target.value);
        onInputChange('post', e.target.value);
      };
      const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
         setName(e.target.value);
         onInputChange('name', e.target.value);
      };
      const handleTelephoneNumberInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTelephoneNumber(e.target.value);
        onInputChange('number', e.target.value);
      };
      const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        onInputChange('email', e.target.value);
      };
      const handleNoteInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNote(e.target.value);
        onInputChange('note', e.target.value);
      };
      

  return (
    <div>
        <h2 className=' mt-9 mx-9 font-extrabold border-l-4 border-sky-400 border-b-2 pb-2 pl-2'>キーパーソン情報</h2>
        <div className='w-1/2 mx-9 mt-5' >
            <div className='flex mx-auto'>
                    <InputField label="部署名" name="department_name" id="department_name" value={department} onChange={handleDepartmentInputChange} />
                <div className='ml-12'>
                    <InputField label="役職" name="post" id="post" value={post} onChange={handlePostInputChange}/>
                </div>
            </div>
            <div className='flex mx-auto mt-8'>
                <div>
                    <InputField label="氏名" name="name" id="name" value={name} onChange={handleNameInputChange}/>
                </div>
                <div className='ml-12'>
                    <InputField label="電話番号" name="number" id="number" value={telephoneNumber} onChange={handleTelephoneNumberInputChange}/>
                </div>
            </div>
            <div className='flex mx-auto mt-8'>
                <div>
                    <InputField label="メールアドレス" name="email" id="email" value={email} onChange={handleEmailInputChange}/>
                </div>
                <div className='ml-12'>
                    <InputField label="特記事項" name="special_note" id="special_note" value={note} onChange={handleNoteInputChange}/>
                </div>
            </div>
        </div>
    </div>
  )
}
