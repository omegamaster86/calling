import { Stack, Input } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';

interface FilterCompanyProps {
    onNextCallingDayChange: (companyIndustry: string) => void;
  }
  
  export const FilterNextCallingDay: React.FC<FilterCompanyProps> = ({ onNextCallingDayChange }) => {
    const [NextCallingDay, setNextCallingDay] = useState('');
  
    const handleNextCallingDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNextCallingDay(event.target.value);
      onNextCallingDayChange(event.target.value);
    };

  return (
    <Stack ml='5'>
      <Input
        placeholder='次回架電日'
        size='md'
        bg='Cyan 50'
        w='120px'
        value={NextCallingDay}
        onChange={handleNextCallingDayChange}
      />
    </Stack>
  );
}