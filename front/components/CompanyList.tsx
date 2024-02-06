import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Select,Button } from '@chakra-ui/react';
import { FilterCallingResult } from './FilterComponents/FilterCallingResult';
import { FilterCompany } from './FilterComponents/FilterCompany';
import { FilterCompanyNumber } from './FilterComponents/FilterCompanyNumber';
import { FilterIndustryCompany } from './FilterComponents/FilterCompanyIndustry';
import { FilterSalesman } from './FilterComponents/FilterSalesman';

  export const CompanyList = () => {

    const [companies, setCompanies] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [filterCompanyName, setFilterCompanyName] = useState('');
    const [filterCompanyNumber, setFilterCompanyNumber] = useState('');
    const [filterCompanyIndustry, setFilterCompanyIndustry] = useState('');
    const [filterCompanySalesman, setFilterCompanySalesman] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        try {
          const resCompanies = await fetch('http://localhost:3000/companies');
          const companiesData = await resCompanies.json();
  
          const resKeyPersons = await fetch('http://localhost:3000/key_persons');
          const keyPersonsData = await resKeyPersons.json();
  
          // companiesとkeyPersonsを結合
          const mergedData = companiesData.map(company => {
            return {
              ...company,
              keyPerson: keyPersonsData.find(kp => kp.company_id === company.id)
            };
          });
  
          setCompanies(mergedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        } 
      };
      fetchData();
    }, []);
    // TODO アタックログ実装後、次回予定日、営業担当のフィルター機能を実装する
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
    const handleSalesmanChange = (companySalesman: string) => {
      setFilterCompanySalesman(companySalesman);
    };

    const filteredCompanies = companies
    .filter(company =>
      filterCompanyName === '' || company.company_name.toLowerCase().includes(filterCompanyName.toLowerCase()) 
    )
    .filter(company =>
      filterCompanyNumber === '' || company.telephone_number === parseInt(filterCompanyNumber, 10)
    )
    // nullが入っている場合、下記のようにする
    .filter(company =>
      filterCompanyIndustry === '' || (company.industry && company.industry.toLowerCase().includes(filterCompanyIndustry.toLowerCase())) 
    )
    .filter(company =>
      filterCompanySalesman === '' || company.keyPerson.name.toLowerCase().includes(filterCompanySalesman.toLowerCase()) 
    );
    // 現在は試しでkeyPersonを表示、品等は営業担当に変更する


    // アタックログから情報を取得
    // const filteredCallingResult = selectedOption
    // ? companies.filter(company => attacklog.--- === selectedOption) // 仮にアポイント結果をappointmentResultプロパティと仮定
    // : companies;
  
    return (
    <div>
        <div className="flex h-[70px] bg-cyan-400 items-center justify-around">
          <div className='flex'>
            <FilterCallingResult onCallingResultChange={handleSelectChange}/>
            <FilterCompany onCompanyChange={handleCompanyChange}/>
            <FilterCompanyNumber onCompanyNumberChange={handleInputNumberChange}/>
            <FilterIndustryCompany onCompanyIndustryChange={handleIndustryChange}/>
            <FilterSalesman onCompanySalesmanChange={handleSalesmanChange}/>
            <Button colorScheme='blue' mx='5' type="submit" px="90">
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
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                      <td className='border-2'>{company.address}</td>
                      <td className='border-2'>アポイント{index + 1}</td>
                      <td className='border-2'>担当者 {index + 1}</td>
                      <td className='border-2'>予定日 {index + 1}</td>
                      <td className='border-2'><Link href={`/attacklog?company=${company.id}`}>{company.company_name}</Link></td>
                      <td className='border-2'>{company.telephone_number}</td>
                      <td className='border-2'>{company.industry}</td>
                      <td className='border-2'>{company.keyPerson? company.keyPerson.name : 'N/A'}</td>
                      <td className='border-2'>{company.keyPerson? company.keyPerson.department : 'N/A'}</td>
                      <td className='border-2'>特記事項 {index + 1}</td>
                    </tr>
                  );
                  })}
              </tbody>
          </table>
        </div>
    </div>
  )
}