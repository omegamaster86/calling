import { Stack, Input } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';

interface FilterCompanyProps {
    onCompanyNumberChange: (companyNumber: string) => void;
  }
  
  export const FilterCompanyNumber: React.FC<FilterCompanyProps> = ({ onCompanyNumberChange }) => {
    const [companyNumber, setCompanyNumber] = useState('');
  
    const handleInputNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCompanyNumber(event.target.value);
      onCompanyNumberChange(event.target.value);
    };

  return (
    <Stack ml='5'>
      <Input
        placeholder='電話番号'
        size='md'
        bg='Cyan 50'
        w='110px'
        value={companyNumber}
        onChange={handleInputNumberChange}
      />
    </Stack>
  );
}