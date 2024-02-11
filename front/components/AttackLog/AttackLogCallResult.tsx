import React, { FC, useEffect, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { Textarea } from '@chakra-ui/react'

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

export const AttackLogCallResult = () => {
    const [companies, setCompanies] = useState([]);
    const router = useRouter();
    const company = router.query.company as string | string[] | undefined;
    const [callingDay, setCallingDay] = useState('');
    const [callingStart, setCallingStart] = useState('');
    const [callResult, setCallResult] = useState('');
    const [nextCallDay, setNextCallDay] = useState('');
    const [salseman, setSalseman] = useState('');
    const [callContent, setCallContent] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          // companyがまだ取得できていない場合は何もしない
          if (!company) return;
          try {
            const resCompanies = await fetch('http://localhost:3000/companies');
            const companiesData = await resCompanies.json();
    
            const resAttackLogs = await fetch('http://localhost:3000/attack_logs');
            const AttackLogsData = await resAttackLogs.json();
    
            // companiesとAttackLogsを結合
            const mergedData = companiesData.map(company => {
              return {
                ...company,
                AttackLog: AttackLogsData.find(at => at.company_id === company.id)
              };
            });
    
            setCompanies(mergedData);

            const selectedCompany = mergedData.find(comp => comp.id.toString() === company); // companyクエリと一致するIDを持つ会社を探す
            if (selectedCompany) {
                setCallingDay(selectedCompany.calling_day);
                setCallingStart(selectedCompany.calling_start);
                setCallResult(selectedCompany.call_result);
                setNextCallDay(selectedCompany.next_call_day);
                setSalseman(selectedCompany.salseman);
                setCallContent(selectedCompany.call_content);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } 
        };
        fetchData();
      }, [company]);

      const handleCallingDayInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCallingDay(e.target.value);
      };
      const handleCallingStartInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCallingStart(e.target.value);
      };
      const handleCallResultInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCallResult(e.target.value);
      };
      const handleNextCallDayInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNextCallDay(e.target.value);
      };
      const handleSalsemanInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSalseman(e.target.value);
      };
      const handleCallContentTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCallContent(e.target.value);
      };

    return (
        <div>
            <h2 className=' mt-9 mx-9 font-extrabold border-l-4 border-sky-400 border-b-2 pb-2 pl-2'>アタックログ</h2>
            <div className='w-1/2 mx-9 my-5'>
                <div className='flex mx-auto'>
                    <div>
                        <InputField label="アタック日" name="call_day" id="call_day" value={callingDay} onChange={handleCallingDayInputChange}/>
                    </div>
                    <div className='ml-12'>
                        <InputField label="架電開始時間" name="calling_start_at" id="calling_start_at" value={callingStart} onChange={handleCallingStartInputChange}/>
                    </div>
                </div>
                <div className='flex mx-auto mt-8'>
                    <div>
                        <InputField label="架電結果" name="call_result" id="call_result" value={callResult} onChange={handleCallResultInputChange}/>
                    </div>
                    <div className='ml-12'>
                        <InputField label="次回架電日" name="next_call_day" id="next_call_day" value={nextCallDay} onChange={handleNextCallDayInputChange}/>
                    </div>
                </div>
                <div className='flex mx-auto mt-8'>
                    <div>
                        <InputField label="担当者" name="salesman" id="salesman" value={salseman} onChange={handleSalsemanInputChange}/>
                    </div>
                    <div className='ml-12'>
                        <label className=" text-sm font-semibold leading-6 text-sky-400">対話内容</label>
                        <div className="w-64 border-b-2">
                            <Textarea className="outline-none block rounded-md px-3.5 py-2 text-gray-900 sm:text-sm sm:leading-6" value={callContent} onChange={handleCallContentTextChange}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}