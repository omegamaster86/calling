import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { FilterCallingResult } from '../FilterComponents/FilterCallingResult';
import { FilterCompany } from '../FilterComponents/FilterCompany';
import { FilterCompanyNumber } from '../FilterComponents/FilterCompanyNumber';
import { FilterIndustryCompany } from '../FilterComponents/FilterCompanyIndustry';
import { FilterSalesman } from '../FilterComponents/FilterSalesman';
import { FilterNextCallingDay } from '../FilterComponents/FilterNextCallingDay'
import { useCompanyAndKeyPersonsData } from './useSWRCompanyList';
import { Company, ExtendedCompany } from '../../types/interface';

  export const CompanyList = () => {
    // const [companies, setCompanies] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [filterCompanyName, setFilterCompanyName] = useState('');
    const [filterCompanyNumber, setFilterCompanyNumber] = useState('');
    const [filterCompanyIndustry, setFilterCompanyIndustry] = useState('');
    const [filterSalesman, setFilterSalesman] = useState('');
    const [filterNextCallingDay, setNextCallingDay ] = useState('');
    const { mergedData, isLoading, isError } = useCompanyAndKeyPersonsData();
    
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading data</div>;

    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };
    const handleCompanyChange = (companyName: string) => {
      setFilterCompanyName(companyName);
    };
    const handleInputNumberChange = (companyNumber: string) => {
      setFilterCompanyNumber(companyNumber);
    };
    const handleIndustryChange = (companyIndustry: string) => {
      setFilterCompanyIndustry(companyIndustry);
    };
    const handleSalesmanChange = (Salesman: string) => {
      setFilterSalesman(Salesman);
    };
    const handleNextCallingDayChange = (NextCallingDay: string) => {
      setNextCallingDay(NextCallingDay);
    }

    const filteredCompanies = mergedData
    .filter((company: ExtendedCompany) =>
    selectedOption === '' || company.latestCallResult!.toLowerCase().includes(selectedOption.toLowerCase()) 
    )
    .filter((company: Company) =>
      filterCompanyName === '' || company.company_name.toLowerCase().includes(filterCompanyName.toLowerCase()) 
    )
    .filter((company: Company) =>
      filterCompanyNumber === '' || company.telephone_number === filterCompanyNumber, 10
    )
    // nullが入っている場合、下記のようにする
    .filter((company: Company) =>
      filterCompanyIndustry === '' || (company.industry && company.industry.toLowerCase().includes(filterCompanyIndustry.toLowerCase())) 
    )
    .filter((company: ExtendedCompany) =>
      filterSalesman === '' || company.latestSalesman!.toLowerCase().includes(filterSalesman.toLowerCase()) 
    )
    .filter((company: ExtendedCompany) =>
    filterNextCallingDay === '' || company.nextCallDay!.toLowerCase().includes(filterNextCallingDay.toLowerCase()) 
    );
    
    return (
    <div>
        <div className="flex h-[70px] bg-cyan-400 items-center justify-around">
          <div className='flex'>
            <FilterCallingResult onCallingResultChange={handleSelectChange}/>
            <FilterCompany onCompanyChange={handleCompanyChange}/>
            <FilterCompanyNumber onCompanyNumberChange={handleInputNumberChange}/>
            <FilterIndustryCompany onCompanyIndustryChange={handleIndustryChange}/>
            <FilterSalesman onCompanySalesmanChange={handleSalesmanChange}/>
            <FilterNextCallingDay onNextCallingDayChange={handleNextCallingDayChange}/>
            <Button colorScheme='blue' mx='5' type="submit" px="5">
              <Link href={'/company-resister'}>企業登録フォームへ</Link>
            </Button>
          </div>
        </div>
        <div className='px-2' style={{ height: '700px', width: '100%', overflowX: 'auto', overflowY: 'auto' }}>
          <table>
              <thead>
                <tr>
                  <th className='border-2 w-44'>住所</th>
                  <th className='border-2 w-44'>架電結果</th>
                  <th className='border-2 w-44'>営業担当者</th>
                  <th className='border-2 w-44'>次回予定日</th>
                  <th className='border-2 w-44'>会社名</th>
                  <th className='border-2 w-44'>電話番号</th>
                  <th className='border-2 w-44'>業界</th>
                  <th className='border-2 w-44'>名前</th>
                  <th className='border-2 w-44'>部署</th>
                  <th className='border-2 w-44'>特記事項</th>
                </tr>
              </thead>
              <tbody  className='border-solid border-2'>
                {filteredCompanies.map((company, index) => {
                   const companyIndustry = company.industry.length > 10 
                   ? `${company.industry.substring(0, 10)}...` 
                   : company.industry;
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                      <td className='border-2'>{company.address}</td>
                      <td className='border-2'>{company.latestCallResult}</td>
                      <td className='border-2'>{company.latestSalesman}</td>
                      <td className='border-2'>{company.nextCallDay}</td>
                      <td className='border-2'><Link href={`/attacklog?company=${company.id}`}>{company.company_name}</Link></td>
                      <td className='border-2'>{company.telephone_number}</td>
                      <td className='border-2'>{companyIndustry}</td>
                      <td className='border-2'>{company.keyPerson? company.keyPerson.name : ''}</td>
                      <td className='border-2'>{company.keyPerson? company.keyPerson.department : ''}</td>
                      <td className='border-2'>{company.keyPerson? company.keyPerson.note : ''}</td>
                    </tr>
                  );
                  })}
              </tbody>
          </table>
        </div>
    </div>
  )
}