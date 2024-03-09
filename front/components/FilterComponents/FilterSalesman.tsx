import { Stack, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

interface FilterCompanyProps {
    filterSalesman: string;
    onCompanySalesmanChange: (companyIndustry: string) => void;
  }
  
export const FilterSalesman: React.FC<FilterCompanyProps> = ({ filterSalesman, onCompanySalesmanChange }) => {
  const [companySalesman, setCompanySalesman] = useState(filterSalesman || '');

  useEffect(() => {
    setCompanySalesman(filterSalesman || '');
  }, [filterSalesman]);

  const handleSalesmanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanySalesman(event.target.value);
    onCompanySalesmanChange(event.target.value);
  };

  return (
    <Stack ml='5'>
      <Input
        placeholder='営業担当'
        size='md'
        bg='Cyan 50'
        w='110px'
        value={companySalesman}
        onChange={handleSalesmanChange}
      />
    </Stack>
  );
}