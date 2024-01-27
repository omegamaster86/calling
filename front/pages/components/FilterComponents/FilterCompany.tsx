import { Stack, Input } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';

interface FilterCompanyProps {
    onCompanyChange: (companyName: string) => void;
  }
  
  export const FilterCompany: React.FC<FilterCompanyProps> = ({ onCompanyChange }) => {
    const [companyName, setCompanyName] = useState('');
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCompanyName(event.target.value);
      onCompanyChange(event.target.value);
    };

  return (
    <Stack ml='5'>
      <Input
        placeholder='会社名'
        size='md'
        bg='Cyan 50'
        w='110px'
        value={companyName}
        onChange={handleInputChange}
      />
    </Stack>
  );
}