import { Stack, Input } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';

interface FilterCompanyProps {
    onCompanyIndustryChange: (companyIndustry: string) => void;
  }
  
  export const FilterIndustryCompany: React.FC<FilterCompanyProps> = ({ onCompanyIndustryChange }) => {
    const [companyIndustry, setCompanyIndustry] = useState('');
  
    const handleIndustryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCompanyIndustry(event.target.value);
      onCompanyIndustryChange(event.target.value);
    };

  return (
    <Stack ml='5'>
      <Input
        placeholder='業界'
        size='md'
        bg='Cyan 50'
        w='110px'
        value={companyIndustry}
        onChange={handleIndustryChange}
      />
    </Stack>
  );
}