import React, { FC } from 'react';
import { Textarea } from '@chakra-ui/react'

interface InputFieldProps {
    label: string;
    name: string;
    id: string;
    type?: string;
  }

const InputField: FC<InputFieldProps> = ({ label, name, id, type = "text" }) => {
    return (
      <div>
        <label className="text-sm font-semibold leading-6 text-sky-400">{label}</label>
        <div className="w-64 border-b-2">
          <input 
            type={type}
            name={name}
            id={id}
            // ユーザーがフォームフィールドに入力する際、ブラウザが過去に入力したデータを基に自動で候補を表示し、ユーザーが素早くフォームを入力できるようにする
            autoComplete="given-name"
            className="outline-none block rounded-md px-3.5 py-2 text-gray-900 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    );
  };

export const AttackLogInfo = () => {
  return (
    <div className='mt-5 mx-auto'>
        <h2 className='mx-9 font-extrabold border-l-4 border-sky-400 border-b-2 pb-2 pl-2'>法人情報</h2>
        <form className='w-1/2 mx-9 mt-5 '>
            <div className='flex mx-auto'>
                    <InputField label="会社名" name="company-name" id="company-name" />
                <div className='ml-12'>
                    <InputField label="住所" name="address" id="address" />
                </div>
            </div>
            <div className='flex mx-auto mt-8'>
                <div>
                    <InputField label="会社サイト" name="company-site" id="company-site" />
                </div>
                <div className='ml-12'>
                    <InputField label="登記電話番号" name="telephone_number" id="telephone_number" />
                </div>
            </div>
        </form>
        <h2 className=' mt-9 mx-9 font-extrabold border-l-4 border-sky-400 border-b-2 pb-2 pl-2'>キーパーソン情報</h2>
        <form className='w-1/2 mx-9 mt-5 '>
            <div className='flex mx-auto'>
                    <InputField label="部署名" name="department_name" id="department_name" />
                <div className='ml-12'>
                    <InputField label="役職" name="post" id="post" />
                </div>
            </div>
            <div className='flex mx-auto mt-8'>
                <div>
                    <InputField label="氏名" name="name" id="name" />
                </div>
                <div className='ml-12'>
                    <InputField label="電話番号" name="number" id="number" />
                </div>
            </div>
            <div className='flex mx-auto mt-8'>
                <div>
                    <InputField label="メールアドレス" name="email" id="email" />
                </div>
                <div className='ml-12'>
                    <InputField label="特記事項" name="special_note" id="special_note" />
                </div>
            </div>
        </form>
        <h2 className=' mt-9 mx-9 font-extrabold border-l-4 border-sky-400 border-b-2 pb-2 pl-2'>アタックログ</h2>
        <form className='w-1/2 mx-9 my-5 '>
            <div className='flex mx-auto'>
                <div>
                    <InputField label="アタック日" name="call_day" id="call_day" />
                </div>
                <div className='ml-12'>
                    <InputField label="架電開始時間" name="calling_start_at" id="calling_start_at" />
                </div>
            </div>
            <div className='flex mx-auto mt-8'>
                <div>
                    <InputField label="架電結果" name="call_result" id="call_result" />
                </div>
                <div className='ml-12'>
                    <InputField label="次回架電日" name="next_call_day" id="next_call_day" />
                </div>
            </div>
            <div className='flex mx-auto mt-8'>
                <div>
                    <label className=" text-sm font-semibold leading-6 text-sky-400">対話内容</label>
                    <div className="w-64 border-b-2">
                        <Textarea className="outline-none block rounded-md px-3.5 py-2 text-gray-900 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div className='ml-12 items-center grid'>
                  <div className=" bg-emerald-500 w-24 flex items-center rounded-md py-2 px-5 mx-2 text-white font-semibold">
                        <div className="pl-3">登録</div>
                    </div>
                </div>
            </div>
        </form>
    </div>
  );
}