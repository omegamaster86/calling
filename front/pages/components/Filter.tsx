import React, { useState } from 'react';
import { Select, Input, Stack } from '@chakra-ui/react'

export const Filter = () => {
    const [selectedCompany, setSelectedCompany] = useState('');
    const [filterText, setFilterText] = useState('');
    const companies = ['会社名1', '会社名2', '会社名3'];

    const filteredCompanies = companies.filter(company =>
        company === selectedCompany
    );

    return (
            <div className="h-[70px] bg-cyan-400 flex items-center" >
                <div className="flex">
                    <div className='ml-3'>
                        <select
                            className='p-2 rounded-lg'
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                        >
                            <option value="">会社名</option>
                            {companies.map((company, index) => (
                                <option key={index} value={company}>{company}</option>
                            ))}
                        </select>
                    </div>
                    <Select placeholder='会社名' bg='Cyan 50' ml='5'>
                        <option value='option1'>会社名1</option>
                        <option value='option2'>会社名2</option>
                        <option value='option3'>会社名3</option>
                    </Select>
                    <Stack ml='5' >
                        <Input placeholder='電話番号' size='md' bg='Cyan 50' w='110px'/>
                    </Stack>
                    <Select placeholder='業界' bg='Cyan 50' ml='5'>
                        <option value='option1'>IT</option>
                        <option value='option2'>小売</option>
                        <option value='option3'>建設</option>
                    </Select>
                    <Select placeholder='架電結果' bg='Cyan 50' ml='5'>
                        <option value='option1'>アポイント</option>
                        <option value='option2'>不在</option>
                        <option value='option3'>資料送付</option>
                    </Select>
                    <Select placeholder='営業担当' bg='Cyan 50' ml='5'>
                        <option value='option1'>蒲原</option>
                        <option value='option2'>オメガマスター</option>
                        <option value='option3'>正俊</option>
                    </Select>
                    {/* <div>
                        {selectedCompany && filteredCompanies.map((company, index) => (
                            <div key={index}>{company}</div>
                        ))}
                    </div> */}
                </div>
            </div>
    )
}