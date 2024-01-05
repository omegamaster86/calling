import * as React from 'react';
import { Textarea } from '@chakra-ui/react'

export const AttackLogLeft = () => {
  return (
    <div className='mt-5'>
        <h2 className='mx-9 font-extrabold border-l-4 border-sky-400 border-b-2 pb-2 pl-2'>法人情報</h2>
        <form className='w-1/2 mx-9 mt-5 '>
            <div className='flex mx-auto'>
                <div>
                    <label className=" text-sm font-semibold leading-6 text-sky-400">会社名</label>
                    <div className="w-64 border-b-2">
                        <input type="text" name="company-name" id="company-name" autoComplete="given-name" className="outline-none block rounded-md px-3.5 py-2 text-gray-900 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div className='ml-12'>
                    <label className="block text-sm font-semibold leading-6 text-sky-400">住所</label>
                    <div className="w-64 border-b-2 ">
                        <input type="text" name="address" id="address" autoComplete="given-name" className="outline-none block rounded-md px-3.5 py-2 text-gray-900 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
            </div>
            <div className='flex mx-auto mt-8'>
                <div>
                    <label className=" text-sm font-semibold leading-6 text-sky-400">会社サイト</label>
                    <div className="w-64 border-b-2">
                        <input type="text" name="company-site" id="company-site" autoComplete="given-name" className="outline-none block rounded-md px-3.5 py-2 text-gray-900 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div className='ml-12'>
                    <label className="block text-sm font-semibold leading-6 text-sky-400">登記電話番号</label>
                    <div className="w-64 border-b-2 ">
                        <input type="text" name="telephone_number" id="telephone_number" autoComplete="given-name" className="outline-none block rounded-md px-3.5 py-2 text-gray-900 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
            </div>
        </form>
        <h2 className=' mt-9 mx-9 font-extrabold border-l-4 border-sky-400 border-b-2 pb-2 pl-2'>キーパーソン情報</h2>
        <form className='w-1/2 mx-9 mt-5 '>
            <div className='flex mx-auto'>
                <div>
                    <label className=" text-sm font-semibold leading-6 text-sky-400">部署名</label>
                    <div className="w-64 border-b-2">
                        <input type="text" name="department_name" id="department_name" autoComplete="given-name" className="outline-none block rounded-md px-3.5 py-2 text-gray-900 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div className='ml-12'>
                    <label className="block text-sm font-semibold leading-6 text-sky-400">役職</label>
                    <div className="w-64 border-b-2 ">
                        <input type="text" name="post" id="post" autoComplete="given-name" className="outline-none block rounded-md px-3.5 py-2 text-gray-900 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
            </div>
            <div className='flex mx-auto mt-8'>
                <div>
                    <label className=" text-sm font-semibold leading-6 text-sky-400">氏名</label>
                    <div className="w-64 border-b-2">
                        <input type="text" name="name" id="name" autoComplete="given-name" className="outline-none block rounded-md px-3.5 py-2 text-gray-900 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div className='ml-12'>
                    <label className="block text-sm font-semibold leading-6 text-sky-400">電話番号</label>
                    <div className="w-64 border-b-2 ">
                        <input type="text" name="number" id="number" autoComplete="given-name" className="outline-none block rounded-md px-3.5 py-2 text-gray-900 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
            </div>
            <div className='flex mx-auto mt-8'>
                <div>
                    <label className=" text-sm font-semibold leading-6 text-sky-400">メールアドレス</label>
                    <div className="w-64 border-b-2">
                        <input type="text" name="email" id="email" autoComplete="given-name" className="outline-none block rounded-md px-3.5 py-2 text-gray-900 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div className='ml-12'>
                    <label className="block text-sm font-semibold leading-6 text-sky-400">特記事項</label>
                    <div className="w-64 border-b-2 ">
                        <input type="text" name="special_note" id="special_note" autoComplete="given-name" className="outline-none block rounded-md px-3.5 py-2 text-gray-900 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
            </div>
        </form>
        <h2 className=' mt-9 mx-9 font-extrabold border-l-4 border-sky-400 border-b-2 pb-2 pl-2'>アタックログ</h2>
        <form className='w-1/2 mx-9 my-5 '>
            <div className='flex mx-auto'>
                <div>
                    <label className=" text-sm font-semibold leading-6 text-sky-400">アタック日</label>
                    <div className="w-64 border-b-2">
                        <input type="text" name="department_name" id="department_name" autoComplete="given-name" className="outline-none block rounded-md px-3.5 py-2 text-gray-900 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div className='ml-12'>
                    <label className="block text-sm font-semibold leading-6 text-sky-400">架電開始時間</label>
                    <div className="w-64 border-b-2 ">
                        <input type="text" name="post" id="post" autoComplete="given-name" className="outline-none block rounded-md px-3.5 py-2 text-gray-900 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
            </div>
            <div className='flex mx-auto mt-8'>
                <div>
                    <label className=" text-sm font-semibold leading-6 text-sky-400">架電結果</label>
                    <div className="w-64 border-b-2">
                        <input type="text" name="name" id="name" autoComplete="given-name" className="outline-none block rounded-md px-3.5 py-2 text-gray-900 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div className='ml-12'>
                    <label className="block text-sm font-semibold leading-6 text-sky-400">次回架電日</label>
                    <div className="w-64 border-b-2 ">
                        <input type="text" name="number" id="number" autoComplete="given-name" className="outline-none block rounded-md px-3.5 py-2 text-gray-900 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
            </div>
            <div className='flex mx-auto mt-8'>
                <div>
                    <label className=" text-sm font-semibold leading-6 text-sky-400">対話内容</label>
                    <div className="w-64 border-b-2">
                        <Textarea className="outline-none block rounded-md px-3.5 py-2 text-gray-900 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
            </div>
        </form>
    </div>
  );
}